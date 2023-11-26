const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [50, "Name must be at least 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username exists"],
      lowercase: true,
    },
    password: { type: String, select: false },
    forgetPasswordToken: { type: String },
    forgetPasswordExpiryDate: { type: Date },
  },
  {
    timestamps: true,
  }
);

const userModels = mongoose.model("User", userSchema);
module.exports = userModels;