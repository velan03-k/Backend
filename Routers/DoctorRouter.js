const express = require("express");
const router = express.Router();
const { CreateDoctor } = require("../Controllers/DoctorController");
const { GetAllDoctors } = require("../Controllers/DoctorController");
// const { GetDoctorById } = require("../Controllers/DoctorController");
// const { UpdateDoctor } = require("../Controllers/DoctorController");
// const { DeleteDoctor } = require("../Controllers/DoctorController");

router.post("/", CreateDoctor);
router.get("/", GetAllDoctors);
// router.get("/:id", GetDoctorById);
// router.put("/:id", UpdateDoctor);
// router.delete("/:id", DeleteDoctor);

module.exports = router;