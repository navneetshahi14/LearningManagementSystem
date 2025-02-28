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
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, jwt_secret);

      req.user = await user.findById(decoded.id).select("-password");

      next();
    } catch (err) {
      console.log(err.message);
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
