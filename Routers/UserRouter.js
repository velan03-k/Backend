const express = require('express');
const router = express.Router();
const { CreateUser } = require("../Controllers/UserController");
const { Checkuser } = require("../Controllers/UserController");

// to pass the data use post method
router.post("/" , CreateUser);
router.post("/login", Checkuser);



module.exports = router;