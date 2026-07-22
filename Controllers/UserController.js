const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register User
const CreateUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      role,
    } = req.body;


    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }


    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password and Confirm Password do not match",
      });
    }


    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }


    // Hash password here
    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,

      // You don't need to store confirmPassword
      // remove this field from schema also
      role: role || "user",
    });


    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });


  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// Login
const Checkuser = async (req, res) => {
  try {

    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are required",
      });
    }


    // const user = await User.findOne({ email });

    const user = await User.findOne({ email });

console.log(user);


    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }


    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );


    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }


    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );


    res.status(200).json({

      message: "Login Successful",

      token,

      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },

    });


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


module.exports = {
  CreateUser,
  Checkuser,
};