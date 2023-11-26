const signup = (req, res) => {
  //   console.log("Request Body : ", req.body);
  const { name, email, password, confirmPassword } = req.body;

  return res.status(200).json({
    success: true,
    data: req.body, // responding data received from user(body)
  });
};

module.exports = { signup };
