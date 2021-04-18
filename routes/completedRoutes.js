const express= require('express');
const Todo = require('../models/todo');
const router = express.Router();
// const completedController = require('../controllers/completedController');

var edit=false;

// listening for requests
router.get('/', async(req, res)=>{
    const url = '/completed';
    const completedTodo = await Todo.find({completed: true});
    const activeTodo = await Todo.find({completed: false});
    var count = activeTodo.length;
    const allTodo = await Todo.find();
    all = allTodo.length;
    var edit =false;
    res.render('index', {todo: completedTodo, url: url, count: count, all: all, edit:edit});
});

router.post('/new-todo', (req, res)=>{
    const {todo} = req.body;
    const newTodo = new Todo({todo})
    newTodo.save()
        .then((result) =>{
            res.redirect("/completed");
        })
        .catch((err) =>{
            console.log(err)
        });
});

router.get('/delete-todo/:_id', (req, res)=>{
    const {_id} = req.params;
    Todo.deleteOne({_id})
    .then(()=>{
        res.redirect("/completed");
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
    res.redirect('/completed');
});

router.get('/clear-completed', async (req, res)=>{
    Todo.deleteMany({completed : true})
    .then(()=>{
        res.redirect("/completed");
    })
    .catch((err)=>{
        console.log(err);
    });
});

router.post('/change-todo/:_id', async (req, res)=>{
    const todoVal = req.body.todo;
    const todoCh = await Todo.findById(req.params._id);
    Todo.updateOne({_id: todoCh._id},{todo: todoVal}, function (err, res){
        if(err) throw err;
    });
    res.redirect("/completed");
    edit=false;
});

router.get('/toggle-all', async (req, res)=>{
    const allTodo = await Todo.find();
    console.log(allTodo);
    Todo.updateMany({completed: false},{completed: true}, function (err, res){
        if(err) throw err;
    });
    res.redirect('/completed');
});

module.exports = router;