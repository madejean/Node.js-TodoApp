var express = require('express');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false});

var app = express();

app.use(cookieSession({
  name: 'session',
  secret: 'todoApp'
}))

//if no todolist create empty
.use(function(req, res, next){
  if(typeof(req.session.todolist) == 'undefined'){
    req.session.todolist = [];
  }
  next();
})

.get('/todo', function(req, res){
  res.render('todo.ejs', {todolist: req.session.todolist});
})
.post('/todo/add/', urlencodedParser, function(req, res){
  //from newtodo input
  if(req.body.newtodo != ''){
    req.session.todolist.push(req.body.addTodo);
  }
  res.redirect('/todo');
})
.get('/todo/delete/:id', function(req, res){
  if(req.params.id != ''){
    req.session.todolist.splice(req.params.id, 1);
  }
  res.redirect('/todo');
})
//redirect for unfound pages in routes
.use(function(req, res, next){
  res.redirect('/todo')
})
.listen(8080);
