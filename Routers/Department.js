const express = require('express');
const router = express.Router();
const { CreateDepartment } = require('../Controllers/departmentController');
const { GetAllDepartments } = require('../Controllers/departmentController');

router.post('/', CreateDepartment);
router.get('/', GetAllDepartments);
module.exports = router;