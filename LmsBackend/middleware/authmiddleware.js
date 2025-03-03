const jwt = require("jsonwebtoken");
const user = require("../model/UserSchema");
const dotenv = require("dotenv");
const asyncHandler = require("express-async-handler");
dotenv.config();

const jwt_secret = process.env.JWT_KEY;

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      console.log(req.headers.authorization)
      token = req.headers.authorization.split(" ")[1];
      console.log(token)

      const decoded = await jwt.verify(token, jwt_secret);
      console.log(decoded)

      req.user = await user.findById(decoded.id).select("-password");

      next();
    } catch (err) {
      console.log("Error->",err.message);
    }
  }
});

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }
    next();
  };
};

module.exports = { protect, authorizeRoles };
