const express= require('express');
const Todo = require('../models/todo');
const router = express.Router();



// listening for requests
router.get('/', async (req, res)=>{
    const allTodo = await Todo.find();
    res.render('index', {todo: allTodo, });
});

router.post('/new-todo', (req, res)=>{
    const {todo} = req.body;
    const newTodo = new Todo({todo})
    newTodo.save()
        .then((result) =>{
            console.log(result);
            res.redirect("/");
        })
        .catch((err) =>{
            console.log(err)
        });
});

router.get('/delete-todo/:_id', (req, res)=>{
    const {_id} = req.params;
    Todo.deleteOne({_id})
    .then(()=>{
        res.redirect("/");
    })
    .catch((err)=>{
        console.log(err);
    });
});

router.post('/check/:_id', async (req, res)=>{
    const todo = await Todo.findById(req.params._id);

    if(req.body.completed == 'on'){
        Todo.updateOne({_id: todo._id},{completed: true}, function (err, res){
            if(err) throw err;
        });
    }else{
        Todo.updateOne({_id: todo._id},{completed: false}, function (err, res){
            if(err) throw err;
        });
    }
    res.redirect('/');
});

router.get('/active/', async(req, res)=>{

    const activeTodo = await Todo.find({completed: false});
    res.render('index', {todo: activeTodo });
});
router.get('/completed/', async(req, res)=>{
    const completedTodo = await Todo.find({completed: true});
    res.render('index', {todo: completedTodo });
});




module.exports = router;