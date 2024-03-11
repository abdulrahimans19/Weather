const jwt = require("jsonwebtoken");


const generateToken = (id, time) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: time,
    });
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}


const verifyTokenMiddleware = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = verifyToken(token);
      req.user = decoded; // Attach the decoded token to the request
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  };

module.exports = { generateToken, verifyToken ,verifyTokenMiddleware}