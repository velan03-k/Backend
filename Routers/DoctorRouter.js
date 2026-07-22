const express = require("express");
const router = express.Router();

const {
  CreateDoctor,
  GetAllDoctors,
  getDoctorsByDepartment,
  UpdateDoctor,
  DeleteDoctor
} = require("../Controllers/doctorController");

const verifyToken = require("../Middleware/authMiddleware");
const authorizeRole = require("../Middleware/roleMiddleware");


// Only admin can create doctor
router.post(
  "/",
  verifyToken,
  authorizeRole("admin"),
  CreateDoctor
);


// Admin and users can view doctors
router.get(
  "/",
  verifyToken,
  authorizeRole("admin", "user"),
  GetAllDoctors
);


// Admin and users can filter doctors by department
router.get(
  "/department/:departmentId",
  verifyToken,
  authorizeRole("admin", "user"),
  getDoctorsByDepartment
);

router.put(
  "/:id",
  verifyToken,
  authorizeRole("admin"),
  UpdateDoctor
);

router.delete(
  "/:id",
  verifyToken,
  authorizeRole("admin"),
  DeleteDoctor
);

module.exports = router;