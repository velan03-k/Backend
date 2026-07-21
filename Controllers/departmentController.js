const Department = require('../models/Department');

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

module.exports = {
    CreateDepartment: exports.createDepartment,
    GetAllDepartments: exports.getAllDepartments
};