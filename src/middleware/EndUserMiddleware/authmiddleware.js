const jwt = require("jsonwebtoken");

const checkUserAuth = (req, res, next) => {
  console.log("Authorization Header:", req.headers.authorization); // Log header

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied - No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded Token:", decoded); // Log token payload

    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = checkUserAuth;
