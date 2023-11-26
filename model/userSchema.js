const mongoose = require("mongoose");
const { Schema } = mongoose;
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

userSchema.methods = {
  jwtToken() {
    return JWT.sign(
      {
        id: this._id,
        email: this.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
  },
};

// hashing password before saving into db
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

const userModels = mongoose.model("User", userSchema);
module.exports = userModels;
