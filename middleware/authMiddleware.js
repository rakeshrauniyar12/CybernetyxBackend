const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "Access Denied. No Token Provided." });
    }
   console.log("In Backend",token)
    // Verify Token
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decoded; // Attach userId to request
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
