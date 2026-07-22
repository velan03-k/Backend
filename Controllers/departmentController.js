const Department = require('../Models/Department');

// Create a new department
exports.createDepartment = async (req, res) => {
    try {
        const { name, description, headDoctor, email, phone } = req.body;

        if (!name || !description || !email || !phone) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if department already exists
        const existingDepartment = await Department.findOne({ name });
        if (existingDepartment) {
            return res.status(400).json({ message: 'Department already exists' });
        }   

        const newDepartment = await Department.create({
            name,
            description,
            email,
            phone,
            totalDoctors: 0,
            status: 'Active'
        });

        res.status(201).json(newDepartment);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all departments
exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.status(200).json(departments);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }   
};

const UpdateDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedDepartment = await Department.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedDepartment) {
      return res.status(404).json({
        message: "Department not found",
      });
    }

    res.status(200).json({
      message: "Department updated successfully",
      department: updatedDepartment,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const DeleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.findByIdAndDelete(id);

    if (!department) {
      return res.status(404).json({
        message: "Department not found",
      });
    }

    res.status(200).json({
      message: "Department deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
    CreateDepartment: exports.createDepartment,
    GetAllDepartments: exports.getAllDepartments,
    UpdateDepartment,
    DeleteDepartment
};