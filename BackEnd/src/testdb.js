require('./db');
const TodoList = require('./model/todoList');

// create
var one = new TodoList({userID: 0, taskID: 2, taskTitle: 'falsjflasjlfjasovijo;avocin;ovintoianlkn', taskContent: 'super necessary task', end_date: new Date()});
console.log(one);

one.save((err, obj) => {
    console.log("save")
    console.log(err);
    console.log(obj);
})


TodoList.find((err, obj) => {
    console.log("find0")
    console.log(obj);
})


TodoList.findOne({taskID: 2}, (err, obj) => {
    console.log("find1")
    console.log(obj)
});


TodoList.findOne({taskContent: /necessary/}, (err, obj) => {
    console.log("find2")
    console.log(obj)
})