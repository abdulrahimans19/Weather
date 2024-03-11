const express = require("express");
const router = express.Router();
const {
  addLocation,
  saveNotifications,
} = require("../controller/weatherController");
const { verifyTokenMiddleware } = require("../middleware/jwtGenerate");

router.post("/addLocation", verifyTokenMiddleware, addLocation);
router.post("/notification", verifyTokenMiddleware, saveNotifications);

module.exports = router;
