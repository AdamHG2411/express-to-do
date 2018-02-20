const mongoose = require("./connection");

const ToDoSchema = new mongoose.Schema({
  title: String,
  complete: Boolean
});

const Todo = mongoose.model("Todo", ToDoSchema);

module.exports = Todo;
