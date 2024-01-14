// Utility Function which generates a JWT Token from user Id,and Secret Key

const jwt = require("jsonwebtoken");
const { promisify } = require("util");
// Importing Models
const User = require("../Models/UserModel");
const Test = require("../Models/TestModel");

// Importing Utilities
const parseExcelData = require("../Utils/AdminUtils/read");

const signToken = (id) => {
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

exports.logAdminIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    // Check if the email and password exist
    if (!username || !password) {
      return res.status(400).json({
        status: "fail",
        data: null,
        message: "username and password fields are mandatory",
      });
    }

    // Check if a user with the given email exists in the database
    const actual_admin_username = process.env.ADMIN_USERNAME;
    const actual_admin_password = process.env.ADMIN_PASSWORD;

    // Check if the candidate password is the same as the actual password
    const correct =
      username === actual_admin_username && password === actual_admin_password;

    if (!correct) {
      return res.status(400).json({
        status: "fail",
        data: null,
        message: "Incorrect email or password",
      });
    }
    // If everything is OK, send a token to the client
    const token = signToken(process.env.ADMIN_ID);
    return res.status(200).json({
      status: "success",
      data: null,
      message: "Logged in successfully!",
      token,
    });
  } catch (exception) {
    console.log(exception);
    return res.status(500).json({
      status: "fail",
      data: null,
      message: "Something went wrong at our side!",
      exception: exception.message,
    });
  }
};

exports.createStudentAccounts = async (req, res) => {
  try {
    // Parse data into array of objects
    const newStudentAccountData = parseExcelData(
      "./Data/AccountData/accounts.xlsx"
    );
    /*
    Validate Data: Each Array Object should contain the following keys:
    1.firstName
    2.lastName
    3.emailId
    4.password    
    */
    // Validate Data: Each Array Object should contain the following keys
    const validKeys = ["firstName", "lastName", "emailId", "password"];

    const isValidData = newStudentAccountData.every((student) => {
      return validKeys.every((key) => student.hasOwnProperty(key));
    });

    if (!isValidData) {
      return res.status(400).json({
        status: "fail",
        data: null,
        message:
          "Invalid data format. Each row should have 'firstName', 'lastName', 'emailId' and 'password'.",
      });
    }
    // Delete all data from User model
    await User.deleteMany({});

    // Add the new array of objects to the User model
    await User.insertMany(newStudentAccountData);

    return res.status(200).json({
      status: "success",
      data: newStudentAccountData,
      message: "Accounts Created Successfully!",
    });
  } catch (exception) {
    console.log(exception);
    return res.status(500).json({
      status: "fail",
      data: null,
      message: "Something went wrong at our side!",
      exception: exception.message,
    });
  }
};

exports.createTest = async (req, res) => {
  try {
    // Parse data into array of objects
    const newTestData = parseExcelData("./Data/TestData/test.xlsx");
    /*
    Validate Data: Each Array Object should contain the following keys:
    1.questionId
    2.question
    3.answer
    */
    // Validate Data: Each Array Object should contain the following keys
    const validKeys = ["questionId", "question", "answer"];

    const isValidData = newTestData.every((testObject) => {
      return validKeys.every((key) => testObject.hasOwnProperty(key));
    });

    if (!isValidData) {
      return res.status(400).json({
        status: "fail",
        data: null,
        message:
          "Invalid data format. Each row should have 'questionId', 'question', 'answer' and 'password'.",
      });
    }
    // Delete all data from Test model
    await Test.deleteMany({});

    // Add the new array of objects to the Test model
    await Test.insertMany(newTestData);

    return res.status(200).json({
      status: "success",
      data: newTestData,
      message: "Test Created Successfully!",
    });
  } catch (exception) {
    console.log(exception);
    return res.status(500).json({
      status: "fail",
      data: null,
      message: "Something went wrong at our side!",
      exception: exception.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    // get token and check if it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      return res.status(401).json({
        status: "fail",
        data: null,
        message: "You are not logged in! Please Login to get access",
      });
    }

    if (!token) {
      return res.status(401).json({
        status: "fail",
        data: null,
        message: "You are not logged in! Please Login to get access",
      });
    }

    // validate the token
    let decoded;
    try {
      decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    } catch (exception) {
      return res.status(401).json({
        status: "fail",
        data: null,
        message: "The user belonging to the token does no longer exist",
      });
    }

    if (!(decoded.id === process.env.ADMIN_ID)) {
      return res.status(401).json({
        status: "fail",
        data: null,
        message: "Invalid Token!",
      });
    }
    console.log(decoded);
    req.user = { id: decoded.id }; //attaching the user id to the request object

    //  All the above cases have passed!
    //  Therefore it is an authenticated request! Hence calling next()
    console.log("The User is authenticated!");
    next();
  } catch (exception) {
    console.log(exception);

    return res.status(500).json({
      status: "fail",
      data: null,
      message: "Something went wrong at our side !",
      exception: exception.message,
    });
  }
};
