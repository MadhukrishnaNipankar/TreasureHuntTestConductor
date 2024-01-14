const express = require("express");

// Router Import
const router = express.Router();

// Utility Import

// Import Controllers
const {
  logAdminIn,
  protect,
  createStudentAccounts,
  createTest,
} = require("../Controllers/adminControllers");

// Account Login
router.post("/", logAdminIn);
router.post("/createStudentAccounts", protect, createStudentAccounts);
router.post("/createTest", protect, createTest);

module.exports = router;
