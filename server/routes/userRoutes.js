const express = require("express");
const router = express.Router();
const {
  userSignup,
  userSignIn,
  getCurrentUser,
} = require("../controller/userController");
const { verifyTokenMiddleware } = require("../middleware/jwtGenerate");

router.post("/signUp", userSignup);
router.post("/signIn", userSignIn);
router.get("/current", verifyTokenMiddleware, getCurrentUser);

module.exports = router;
