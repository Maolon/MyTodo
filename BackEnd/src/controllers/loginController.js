"use strict";
const { User } = require("../model/todoList");
const { expireDays, jwtSign } = require("./Auth");
const uuid = require("uuid");

exports.login = async function (req, res) {
  let userName = req.body.userName;
  let password = req.body.password;

  if (!validator([userName, password])) {
    return res.status(403).json({ message: "Invalid Parameter" });
  }

  const user = await User.findOne({
    username: req.body.username,
  });

  if (!user) {
    return res.status(422).json({
      message: "User Not Exist",
    });
  }

  const isPasswordValid = require("bcryptjs").compareSync(
    req.body.password,
    user.password
  );

  if (!isPasswordValid) {
    return res.status(422).json({
      message: "password Invalid",
    });
  }

  const jti = uuid.v1();

  const token = jwtSign(user._id, expireDays, jti);

  user.token = jti;
  user.save();

  res.status(200).json({
    token,
  });
};

exports.register = async function (req, res) {
  //console.log(req.body);
  let userName = req.body.username;
  let password = req.body.password;

  if (!validator([userName, password])) {
    return res.status(403).json({ message: "Invalid Parameter" });
  }

  let newUser = await User.create({
    username: userName,
    password: password,
  });

  newUser
    .save()
    .then((r) => {
      res.status(200),
        json({
          message: "Success Register",
        });
    })
    .catch((err, doc) => {
      //console.log(err);
      if (!err) {
      } else {
        return res.status(400).json({
          message: err,
        });
      }
      res.end();
    });
};

exports.users = async function (req, res) {
  const users = await User.find();
  //console.log(users);
  res.send(users);
  res.end();
};

exports.renew = async function (req, res) {
  const user = req.user;
  const jti = uuid.v1();
  const token = jwtSign(user._id, expireDays, jti);
  user.token = jti;
  user.save();
  res.status(200).send({
    token,
  });
};

exports.userExist = async function (req, res) {
  let user = req.body.username;
  User.find({ username: user });
};

exports.logout = async function (req, res) {
  let user = req.user;
  user.token = " ";
  user.save();
  res.status(200).send({
    message: "Success Logout",
  });
};

exports.tokenValidator = async function(req,res){
  res.status(200).send({
    message: "ok",
  }); 
}

exports.change_password = async function (req, res) {
  let user = req.user;
  let pass = req.body.password;
  try {
    user.password = pass;
    user.token = " ";
    user.save();
    res.status(200).send({
      message: "Success Change Password",
    });
  } catch (err) {
    res.status(400).send({ message: err });
  }
};

function validator(ParamArr) {
  if (!Array.isArray(ParamArr)) {
    return false;
  }

  ParamArr.map((ele, idx) => {
    if (ele === "") {
      return false;
    }
  });

  return true;
}
