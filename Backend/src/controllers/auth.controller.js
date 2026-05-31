const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({
      email
    }).populate(
      "joinedClubs",
      "clubName description"
    );

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      token: generateToken(user._id),
      user
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({
  email
})
.populate(
  "joinedClubs",
  "clubName description"
);
    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    res.status(200).json({
      success: true,
      token: generateToken(user._id),
      user
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};