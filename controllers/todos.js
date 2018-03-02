const express = require('express')
const r = express.Router()

const Todo = require("../models/Todo");

r.get("/", (req, res) => {
  Todo.find({})
    .then(todos => {
      res.render("index", { todos });
    })
    .catch(err => console.log(err));
});

r.get("/new", (req, res) => {
  res.render("todos/new");
});

// create a new to do
r.post("/", (req, res) => {
  Todo.create(req.body).then(todo => {
    res.redirect("/");
  });
});

// get a specific to do
r.get("/:id", (req, res) => {
  Todo.findOne({ _id: req.params.id })
    .then(todo => {
      res.render("todos/show", todo);
    })
    .catch(err => console.log(err));
});

// edit a specific to do
r.get("/edit/:id", (req, res) => {
  Todo.findOne({ _id: req.params.id }).then(todo => {
    res.render("todos/edit", todo);
  });
});

// update a specific to do
r.put("/:id", (req, res) => {
  req.body.complete = req.body.complete ? true : false
  Todo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).then(
    todo => {
      res.redirect("/");
    }
  );
});

// delete a specific to do
r.delete("/:id", (req, res) => {
  Todo.findOneAndRemove({ _id: req.params.id }).then(() => {
    res.redirect("/");
  });
});

module.exports = r