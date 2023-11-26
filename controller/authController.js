const emailValidator = require("email-validator");
const userModel = require("../model/userSchema");

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
    const user = userModel(req.body);
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

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cheking email and password exists
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Getting user from the database
    const user = await userModel.findOne({ email }).select("+password");

    // Cheking user exits and password is correct
    if (!user || !user.password === password) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    //Creating token
    const token = user.jwtToken();
    user.password = undefined;

    const cookieOption = {
      maxAge: 10000 * 60 * 60 * 24, // 24 hr in milliseconds
      httpOnly: true,
    };

    // setting cookie
    res.cookie("token", token, cookieOption);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await userModel.findById(userId);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { signup, signin, getUser };
