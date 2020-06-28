"use strict";
const { Task, User } = require("../model/todoList");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const xss = require("xss");
const validator = require("../util/parameterValidator")

exports.list_all_tasks = async function (req, res) {
  res.status(200).json(req.user.tasks);
};

exports.create_a_task = async function (req, res) {
  const user = req.user;
  let reqTask = req.body.task;
  console.log(user);
  let task = {
    taskID: uuid.v1(),
    taskTitle: xss(reqTask.taskTitle),
    created_date: Date.now(),
    taskContent: xss(reqTask.taskContent),
    taskType: reqTask.taskType,
    end_date: reqTask.end_date,
    important: reqTask.important,
    schedule: reqTask.schedule,
    status: reqTask.status,
  };

  user.tasks.push(task);
  console.log("add task" + user);
  await user.save(function (err) {
    console.log(err);
    if (err) return res.status(400).json({ message: "Bad parameter" });
    res.status(200).json({ message: "ok" });
  });
};

exports.read_a_task = async function (req, res) {
  let taskId = req.params.taskId;
  let user = req.user;

  User.findOne({ _id: user._id, "tasks.taskID": taskId }, (err, result) => {
    if (err) res.status(400).json({ message: "bad task id", err });
    else res.status(200).json(result.tasks[0]);
  });
};

exports.update_a_task = async function (req, res) {
  let taskId = req.params.taskId;
  let user = req.user;
  let reqTask = req.body.task;
  let data = validator(reqTask);
  console.log(data);
  await User.updateOne(
    { _id: user._id, "tasks.taskID": taskId },
    {
      $set: data
    },
    (err) => {
      if (err) return res.status(400).json({ message: err });
    }
  );
  res.status(200).json({ "message:": "ok" });
};

exports.delete_a_task = async function (req, res) {
  let taskId = req.params.taskId;
  let user = req.user;

  User.updateOne(
    { _id: user._id },
    {
      $pull: {
        tasks: { taskID: taskId },
      },
    },
    (err) => {
      if (err) return res.status(400).json({ message: err });
      else res.status(200).json({ "message:": "ok" });
    }
  );
};
