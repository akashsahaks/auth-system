const JWT = require("jsonwebtoken");

const jwtAuth = async (req, res, next) => {
  const token = (req.cookies && req.cookies.token) || null;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const payload = JWT.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id, email: payload.email };
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized or invalid token",
    });
  }

  next();
};

module.exports = jwtAuth;
