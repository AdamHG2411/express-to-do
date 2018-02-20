const express = require('express');
const parser = require('body-parser');
const methodOverride = require('method-override');
const hbs = require('hbs');

const Todo = require('./db/schema')

const app = express();

app.set('view engine', 'hbs');
app.use(parser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

let todos = [
  {
    id: 1,
    title: 'Wash the dishes',
    complete: false
  },
  {
    id: 2,
    title: 'Feed the dog',
    complete: false
  },
  {
    id: 3,
    title: 'Take out the trash',
    complete: false
  }
];

// get all to dos
app.get('/', (req, res) => {
  Todo.find({})
    .then(todos => {
      res.render('index', { todos });
    })
    .catch(err => console.log(err))
});

app.get('/new', (req, res) => {
  res.render('todos/new');
});

// create a new to do
app.post('/', (req, res) => {
  Todo.create(req.body)
    .then(todo => {
      res.redirect('/');
    })
});

// get a specific to do
app.get('/:id', (req, res) => {
  Todo.findOne({ _id: req.params.id })
    .then(todo => {
      res.render('todos/show', todo);
    })
    .catch(err => console.log(err))
});

// edit a specific to do
app.get('/edit/:id', (req, res) => {
  Todo.findOne({_id: req.params.id})
    .then(todo => {
      console.log(todo)
      res.render("todos/edit", todo);
    })
});

// update a specific to do
app.put('/:id', (req, res) => {
  Todo.findOneAndUpdate({_id: req.params.id}, req.body, { new: true })
    .then(todo => {
      res.redirect('/')
    })
});

// delete a specific to do
app.delete('/:id', (req, res) => {
  Todo.findOneAndRemove({ _id: req.params.id })
    .then(() => {
      res.redirect('/')
    })
});

app.listen(3000, () => console.log('server is running!'));
