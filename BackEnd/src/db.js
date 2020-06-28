let mongoose = require("mongoose");
let { Task } = require('./model/todoList')  

mongoose.connect("mongodb://localhost/todo", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("DB Connected");
});


