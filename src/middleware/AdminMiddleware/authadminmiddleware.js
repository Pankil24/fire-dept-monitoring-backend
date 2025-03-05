const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ status: "failed", message: "Access Denied! No token provided" });
    }

    try {
        const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET_KEY);
        req.admin = verified;
        next();
    } catch (error) {
        res.status(400).json({ status: "failed", message: "Invalid Token" });
    }
};

module.exports = verifyToken;
