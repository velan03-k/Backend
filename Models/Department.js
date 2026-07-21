const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        trim: true
    },
    description: {  
        type: String,
        required: true,
        trim: true
    },
   headDoctor: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Doctor",
  default: null,
},
    email: {
        type: String,
        required: true, 
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,     
    trim: true
    },
    totalDoctors: {
        type: Number,
        default: 0  
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    }
}, { timestamps: true });   

module.exports = mongoose.models.Department || mongoose.model('Department', departmentSchema);