const express = require("express");
const router = express.Router();

const {
  CreateDepartment,
  GetAllDepartments,
  UpdateDepartment,
  DeleteDepartment
} = require("../Controllers/departmentController");

const verifyToken = require("../Middleware/authMiddleware");
const authorizeRole = require("../Middleware/roleMiddleware");


// Only admin can create department
router.post(
  "/",
  verifyToken,
  authorizeRole("admin"),
  CreateDepartment
);


// Admin and user can view departments
router.get(
  "/",
  verifyToken,
  authorizeRole("admin", "user"),
  GetAllDepartments
);

router.put(
  "/:id",
  verifyToken,
  authorizeRole("admin"),
  UpdateDepartment
);

router.delete(
  "/:id",
  verifyToken,
  authorizeRole("admin"),
  DeleteDepartment
);

module.exports = router;