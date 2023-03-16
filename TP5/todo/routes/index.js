var express = require('express');
var router = express.Router();
var Todo = require('../controllers/todo')
/* GET home page. */

const renderPage = (res) => {
  var data = new Date().toISOString().substring(0,16)
  Todo.list()
    .then( todos => {
      res.render('index', {list: todos, d: data}) 
    })
    .catch( err => {
      res.render('error', {error: err })
    })
}


router.get('/', function(req, res, next) {
  renderPage(res)
});

/* POST home page. */
router.post('/', function(req, res, next) {
  console.log(req.body)
  var action = req.body.action
  delete req.body.action

  if (action == "add") {
    Todo.addTask(req.body)
      .then(renderPage(res))
      .catch(err => {
      res.render('error', {error: err})
    })
  } else if (action == "update") {
    Todo.updateTask(req.body)
    .then(renderPage(res))
    .catch(err => {
      res.render('error', {error: err})
    })
  } else if (action == "delete") {
    Todo.deleteTask(req.body)
    .then(renderPage(res))
    .catch(err => {
      res.render('error', {error: err})
    })
  }


});


module.exports = router;
