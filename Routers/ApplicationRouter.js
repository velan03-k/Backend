const express = require('express');
const router = express.Router();
const {createApplication} = require("../Controllers/aplicationController")
const {getApplication} = require("../Controllers/aplicationController")

router.post('/', createApplication);
router.get('/', getApplication);
module.exports = router;