import {
  RESET_USER,
  RESET_ALL_USERS,
  ADMIN_LOGIN,
  GET_ALL_USERS,
  GET_RESULT,
  getRandomBaseUrl,
} from "../api";

export const login = (username, password) => {
  const BASEURL = getRandomBaseUrl();
  return async (dispatch) => {
    try {
      const res = await fetch(BASEURL + ADMIN_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const data = await res.json();
      localStorage.clear();
      if (data.status === "fail") {
        dispatch({ type: "DEFAULT" });
        throw new Error(data.message);
      } else {
        alert("Login Successfull");
        localStorage.setItem("admin_token", data.token);
        localStorage.setItem("admin-verified", true);
        dispatch({
          type: "LOGIN",
          token: data.token,
          username: username,
          password: password,
          verified: true,
        });
      }
    } catch (error) {
      alert(error.message);
    }
  };
};

export const getAllUsers = () => {
  const BASEURL = getRandomBaseUrl();
  return async (dispatch) => {
    try {
      const res = await fetch(BASEURL + GET_ALL_USERS, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("admin_token"),
        },
      });
      const data = await res.json();
      console.log(data);
      dispatch({
        type: "GET_USERS",
        users: data.data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const getResult = () => {
  const BASEURL = getRandomBaseUrl();
  return async (dispatch) => {
    try {
      const res = await fetch(BASEURL + GET_RESULT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("admin_token"),
        },
      });
      const data = await res.json();
      console.log(data, "I am data");

      const parsedData = data.data.map((element) => {
        if (element.testSubmissionTime) {
          element.testSubmissionTime = new Date(
            element.testSubmissionTime
          ).toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
        }
        return element;
      });

      console.log(parsedData);

      dispatch({
        type: "GET_RANKS",
        result: parsedData,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const resetUser = (user_id) => {
  const BASEURL = getRandomBaseUrl();
  return async (dispatch) => {
    try {
      const res = await fetch(BASEURL + RESET_USER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("admin_token"),
        },
        body: JSON.stringify({
          userId: user_id,
        }),
      });
      const data = await res.json();
      alert(data.message);
    } catch (error) {
      alert(error.message);
    }
  };
};

// Reset all the test data
export const resetAllUsers = () => {
  const BASEURL = getRandomBaseUrl();
  return async (dispatch) => {
    try {
      const res = await fetch(BASEURL + RESET_ALL_USERS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("admin_token"),
        },
      });
      const data = await res.json();
      alert(data.message);
    } catch (error) {
      alert(error.message);
    }
  };
};
export const logout = () => {
  localStorage.clear();
  return { type: "LOGOUT" };
};
