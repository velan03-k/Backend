const express = require('express');
const router = express.Router();
const {createApplication, updateApplication} = require("../Controllers/aplicationController")
const {getApplication} = require("../Controllers/aplicationController")

router.post('/', createApplication);
router.get('/', getApplication);
router.put("/:id", updateApplication);
router.get("/my", verifyToken, getMyApplications); // Logged-in user

module.exports = router;