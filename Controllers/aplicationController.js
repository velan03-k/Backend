const Application = require("../Models/Application");

// Create Application
exports.createApplication = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      department,
      doctor,
      date,
      time,
      message,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !department ||
      !date ||
      !time ||
      !message
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newApplication = await Application.create({
      name,
      email,
      phone,
      department,
      doctor,
      date,
      time,
      message,
    });

    res.status(201).json({
      message: "Application created successfully",
      application: newApplication,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// Get All Applications
exports.getApplication = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("department", "name")
      .populate("doctor", "name");

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createApplication: exports.createApplication,
  getApplication: exports.getApplication,
};