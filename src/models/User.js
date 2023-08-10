const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: [true, "This email already exists"],
      required: true,
      validate: [
        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        "Email is not valid",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: [4, "Password should be at least 4 characters long"],
      maxlength: [32, "Password should not be more than 32 characters long"],
    },
    role: {
      required: true,
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    formulas: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Formula",
      },
    ],
    estimates: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Estimation",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  return bcrypt.hash(this.password, SALT_ROUNDS).then((hash) => {
    this.password = hash;
    return next();
  });
});
userSchema.method("validatePassword", function (password) {
  return bcrypt.compare(password, this.password);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
