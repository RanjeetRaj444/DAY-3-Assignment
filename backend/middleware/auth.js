const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");

const SECRET = "aman";

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 60, 
  message: { message: "Too many requests, please try again later." },
});

module.exports = {
  authenticateJWT,
  limiter,
  SECRET,
};
