const Doctor = require("../Models/Doctor");
const Department = require("../Models/Department");

const CreateDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      department,
      qualification,
      experience,
      fee,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !department ||
      !qualification ||
      !experience ||
      !fee
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email });

    if (existingDoctor) {
      return res.status(400).json({
        message: "Doctor already exists",
      });
    }

    // Check if department exists
    const departmentExists = await Department.findById(department);

    if (!departmentExists) {
      return res.status(404).json({
        message: "Department not found",
      });
    }

    const newDoctor = await Doctor.create({
      name,
      email,
      phone,
      department,
      qualification,
      experience,
      fee,
    });

    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const GetAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate(
      "department",
      "name description"
    );

    res.status(200).json({ doctors });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  CreateDoctor,
  GetAllDoctors,
};