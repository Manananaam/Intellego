const db = require("../db");
const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const User = db.define("user", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  // role: {
  //   type: Sequelize.ENUM,
  //   defaultValue: "teacher",
  //   values: ["teacher"],
  // },
  role: {
    type: Sequelize.STRING,
    defaultValue: "teacher",
  },
  passwordChangeDate: {
    type: Sequelize.DATE,
  },
});

//@desc: this is a hook that hashes a password if it has been modified
//@note: .changed is a sequelize method to see if a model instance has changed
//bcrypt.hash is provided by bcrypt, and the second parameter (12) is the number of salt rounds
User.addHook("beforeSave", async (user) => {
  if (!user.changed("password")) return;
  user.password = await bcrypt.hash(user.password, 12);
});

// @desc: update passwordChangeDate when user updates password
User.addHook("beforeSave", (user) => {
  if (!user.changed("password") || user.isNewRecord) return;
  user.passwordChangeDate = Date.now() - 1000;
});

// @desc: exclude password field when returning user info
User.prototype.excludePasswordField = function () {
  this.password = undefined;
  this.passwordChangeDate = undefined;
  return this;
};

// @desc: generate jwt (json web token)
User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, keys.JWT_SECRET, {
    expiresIn: keys.JWT_EXPIRES,
  });
};
// @desc: check if user entered password === password in db
User.prototype.checkPassword = async function (candidatePwd) {
  return await bcrypt.compare(candidatePwd, this.password);
};

// @desc: find user by token. If user doesn't exist, or token is invalid, throw error
User.prototype.checkToken = async function (token) {
  try {
    const decode = await jwt.verify(token, keys.JWT_SECRET);
    return decode;
  } catch (err) {
    const error = new Error("Authentication Error - Please Try Again!");
    error.status = 401;
    throw error;
  }
};
// @desc: check if password has been changed since token was originally generated
User.prototype.tokenPrecedesPWChange = function (jwtTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return jwtTimestamp < changedTimestamp;
  }
  return false;
};

module.exports = User;
