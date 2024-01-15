const express = require("express");

// Router Import
const router = express.Router();

// Utility Import

// Import Controllers
const {
  logAdminIn,
  createStudentAccounts,
  createTest,
  getResults,
  protect,
} = require("../Controllers/adminControllers");

// Account Login
router.post("/", logAdminIn);
// Create Student Account
router.post("/createStudentAccounts", protect, createStudentAccounts);
// Create Test
router.post("/createTest", protect, createTest);
// Generate Result
router.post("/getResults", protect, getResults);
module.exports = router;
