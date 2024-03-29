const { generateToken, verifyToken } = require("../middleware/jwtGenerate");
const User = require("../model/UserModel");
const bcrypt = require("bcrypt");

const userSignup = async (req, res) => {
  try {
    const body = req.body;
    const email = body.userEmail;

    const user = await User.findOne({ userEmail: email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const spassword = await bcrypt.hash(body.userPassword, 10);

    const newUser = new User({
      userEmail: body.userEmail,
      userPassword: spassword,
    });

    await newUser.save(); 
    res.status(201).json({ message: "Successfully Registred" });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err,
    });
  }
};

const userSignIn = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    const user = await User.findOne({ userEmail: userEmail });

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const isMatch = await bcrypt.compare(userPassword, user.userPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    const token = generateToken(user._id, "24h");
    res.json({
      message: "success",
      token: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "server error",
    });
  }
};
const getCurrentUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = verifyToken(token);
    const userId = decoded.id;

    const user = await User.findById(userId).select("-userPassword"); // Fetch the user from the database without the password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user); // Return the user details
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { userSignup, userSignIn, getCurrentUser };
