"use strict";

const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let TaskSchema = new Schema({
  taskID: {
    type: String,
    Required: "You should have a taskID",
    index: { unique: true, dropDups: true },
  },
  taskTitle: {
    type: String,
    Required: "You should have a taskTitle",
  },
  taskContent: {
    type: String,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  taskType: {
    type: String,
    enum: ['Task', 'CheckList'],
    default: 'Task',
  },
  important:{
    type:Boolean,
    default: false
  },
  schedule:{
    type:Boolean,
    default: false
  },
  end_date: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["pending", "ongoing", "completed"],
    default: "pending",
  },
});

let UserSchema = new Schema({
  username: {
    type: String,
    Required: "You should have a userName",
    index: { unique: true, dropDups: true },
  },
  password: {
    type: String,
    set(val) {
      return require("bcryptjs").hashSync(val, 10);
    },
  },
  token: {
    type: String,
  },
  tasks:[TaskSchema]
});

const Task = mongoose.model("TASK", TaskSchema);
const User = mongoose.model("USER",UserSchema);
module.exports = { Task,User };
