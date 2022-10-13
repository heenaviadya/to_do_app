var express = require('express');
var router = express.Router();


var todos = require("../resource/todo");
const Todos = require('../models/Todos');



/* GET home page. */
router.get('/', async function(req, res, next) {
  //Todos.find(todos =>{
  
  const todos = await Todos.find();
  console.log(todos);
res.render('home', {todosList: todos});
});


router.get('home', function(req, res, next) {
  res.render('home', { fname: 'Heena', lname:'Vaidya' });
});

router.get('/add-todo', function(req,res,next){
  res.render('add-todo',{title: 'Add To Do' })
})

router.post('/submit-todo', async function(req,res,next){
  // const todo = new Todos({
  //   title: req.body.title,
  //   description: req.body.description});

  //   await todo.save();
//or
    // it can be done as todo.save().then(()=> console.log('todo inserted'))
    //.catch(()=>console.log('error found'))
                         
  await Todos.insertMany([{title: req.body.title, description: req.body.description}])
 // todos.push({...req.body,_id:`00${todos.length}`});
  res.redirect('/');
})


// router.get ('/delete-to-do/:index', function(req, res, next){
//   console.log(req.params.index)
//   todos.splice(req.params.index, 1); //to remove the element at that index
//   res.redirect('/');
// });
router.get('/delete-todo/:id',async function(req,res,next){
  await Todos.remove({_id:req.params.id})
 // const id = todos.findIndex(todo => todo._id === req.params.id);
  //todos.splice(id,1);
   res.redirect('/');
})

router.get('/open-update-form/:id', async function(req,res,next){

  const todo1 = await Todos.findOne({_id: req.params.id} ) 
//const todo1 = todos.find(todo => todo._id === req.params.id)
res.render('edit-todo',{todo : todo1})

})


router.post('/update-todo/:id', async function(req,res,next){

  await Todos.updateOne({_id: req.params.id}, {$set:{title: req.body.title, description: req.body.description} })

  // console.log(req.body,req.params);
  // const index = todos.findIndex(todo => todo._id === req.params.id);
  // todos.splice(index,1,{...req.body, _id: req.params.id});
  res.redirect('/');
})



  



module.exports = router;
