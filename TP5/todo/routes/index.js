var express = require('express');
var router = express.Router();
var Todo = require('../controllers/todo')
/* GET home page. */

const renderPage = (res, data) => {
  Todo.list()
    .then( todos => {
      res.render('index', {list: todos, d: data}) 
    })
    .catch( err => {
      res.render('error', {error: err })
    })
}
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0,16)
  Todo.list()
    .then( todos => {
      res.render('index', {list: todos, d: data}) 
    })
    .catch( err => {
      res.render('error', {error: err })
    })
});

/* POST home page. */
router.post('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0,16)
  
  Todo.addTask(req.body)
    .then(renderPage(res))
    .catch(err => {
      res.render('error', {error: err})
    })

});


module.exports = router;
