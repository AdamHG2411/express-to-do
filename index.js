const express = require('express');
const parser = require('body-parser');
const methodOverride = require('method-override');
const hbs = require('hbs');

const todosController = require('./controllers/todos')

const app = express();

app.set('view engine', 'hbs');
app.use(parser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/', todosController)

app.set('port', process.env.PROT || 3000)
app.listen(app.get('port'), () => console.log(`server is running on ${app.get('port')}!`));
