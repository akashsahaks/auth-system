const emailValidator = require("email-validator");
const userModels = require("../model/userSchema");

const signup = async (req, res) => {
  //   console.log("Request Body : ", req.body);

  const { name, email, password, confirmPassword } = req.body;

  // Validating, is all the fields exists
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // Validating email
  const validEmail = emailValidator.validate(email);
  if (!validEmail) {
    return res.status(400).json({
      success: false,
      message: "Invalid email",
    });
  }

  // Validating password and confirm password are same
  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords and Confirm Password do not match",
    });
  }

  try {
    // creating a new user
    const user = userModels(req.body);
    // saving the user in the database
    const result = await user.save();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Accound already registered with provided email id",
      });
    }
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { signup };
