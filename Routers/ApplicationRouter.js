const express = require("express");
const router = express.Router();

const {
  createApplication,
  getApplication,
  updateApplication,
  getMyApplications,
} = require("../Controllers/aplicationController");

const verifyToken = require("../Middleware/authMiddleware");

router.post("/", verifyToken, createApplication);
router.get("/", getApplication);
router.get("/my", verifyToken, getMyApplications);
router.put("/:id", updateApplication);

module.exports = router;