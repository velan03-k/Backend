const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim : true
    },
    lastName: {
        type: String,
        required: true,
        trim : true
    },
    email: {
        type: String,
        required: true,
        lowercase : true,
        trim : true
    },
    password:{
        type: String,
        required: true,
        trim : true
    },
    confirmPassword : {
        type : String,
        required : true,
        trim : true
    },
    role : {
        type : String,
        enum : ["user", "admin"],
        default  : "user",
    },
},
{ timestamps : true });

const doctorSchema = new mongoose.Schema({
    name :  {
        type : String,
        required : true,
        trim : true,
    },
    email : {
        type : String,
        required : true,
        trim  : true,
        lowercase : true,
    },
    phone : {
        type : String,
        required : true,
        trim : true,
    },
    department : {
    type : String,
    required : true,
    trim : true
    },
    qualification : {
        type : String,
        required : true,
        trim : true,
    },
    experience : {
        type : String,
        required : true,
    }

})

module.exports = mongoose.model("User", userSchema);