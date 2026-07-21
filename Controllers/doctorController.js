const Doctor = require("../Models/Doctor");

const CreateDoctor = async (req, res) => {
    try {
        const { name, email, phone, department, qualification, experience, fee } = req.body;

        if (!name || !email || !phone || !department || !qualification || !experience || !fee) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // check Doctor already exsist

        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ message: "Doctor already exists" });
        }

        const newDoctor = await Doctor.create({
            name,
            email,
            phone,
            department,
            qualification,
            experience,
            fee
        });

res.status(201).json(newDoctor);    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const GetAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json({ doctors });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   

};
    module.exports = { CreateDoctor, GetAllDoctors };