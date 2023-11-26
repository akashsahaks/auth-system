const express = require("express");
const authRouter = express.Router();
const { signup, signin } = require("../controller/authController");

authRouter.post("/signup", signup);
authRouter.get("/signin", signin);

module.exports = authRouter;
