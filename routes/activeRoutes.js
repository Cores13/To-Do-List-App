const express= require('express');
const Todo = require('../models/todo');
const router = express.Router();
// const activeController = require('../controllers/activeController');

var edit=false;

// listening for requests
router.get('/', async(req, res)=>{
    const url = '/active';
    const activeTodo = await Todo.find({completed: false});
    var count = activeTodo.length;
    const allTodo = await Todo.find();
    all = allTodo.length;
    
    res.render('index', {todo: activeTodo, url: url, count: count, all: all, edit: edit});
});

router.post('/new-todo', (req, res)=>{
    const {todo} = req.body;
    const newTodo = new Todo({todo})
    newTodo.save()
        .then((result) =>{
            res.redirect("/active");
        })
        .catch((err) =>{
            console.log(err)
        });
});

router.get('/delete-todo/:_id', (req, res)=>{
    const {_id} = req.params;
    Todo.deleteOne({_id})
    .then(()=>{
        res.redirect("/active");
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
    res.redirect('/active');
});

router.get('/clear-completed', async (req, res)=>{
    Todo.deleteMany({completed : true})
    .then(()=>{
        res.redirect("/active");
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
    res.redirect("/active");
    edit=false;
    // newTodo.save()
    //     .then((result) =>{
    //         res.redirect("/completed");
    //     })
    //     .catch((err) =>{
    //         console.log(err);
    //     });
});
module.exports = router;