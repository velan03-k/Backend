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

// edit application 

const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      {
        status: req.body.status,
        date: req.body.date,
        time: req.body.time,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedApplication) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json(updatedApplication);
  } catch (error) {
    console.error("Update Application Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update application",
      error: error.message,
    });
  }
};

module.exports = {
  createApplication: exports.createApplication,
  getApplication: exports.getApplication,
  updateApplication
};