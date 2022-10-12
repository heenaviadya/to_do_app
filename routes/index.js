var express = require('express');
var router = express.Router();


var todos = require("../resource/todo");



/* GET home page. */
router.get('/', function(req, res, next) {
res.render('home', {todosList:todos});
});


router.get('home', function(req, res, next) {
  res.render('home', { fname: 'Heena', lname:'Vaidya' });
});

router.get('/add-todo', function(req,res,next){
  res.render('add-todo',{title: 'Add To Do' })
})

router.post('/submit-todo', function(req,res,next){
  todos.push({...req.body,_id:`00${todos.length}`});
  res.redirect('/');
})


// router.get ('/delete-to-do/:index', function(req, res, next){
//   console.log(req.params.index)
//   todos.splice(req.params.index, 1); //to remove the element at that index
//   res.redirect('/');
// });
router.get('/delete-todo/:id', function(req,res,next){
  
  const id = todos.findIndex(todo => todo._id === req.params.id);
  todos.splice(id,1);
   res.redirect('/');
})

router.get('/open-update-form/:id', function(req,res,next){
  
const todo1 = todos.find(todo => todo._id === req.params.id)
res.render('edit-todo',{todo : todo1})

})


router.post('/update-todo/:id', function(req,res,next){
  console.log(req.body,req.params);
  const index = todos.findIndex(todo => todo._id === req.params.id);
  todos.splice(index,1,{...req.body, _id: req.params.id});
  res.redirect('/');
})



  



module.exports = router;
