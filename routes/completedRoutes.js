const express= require('express');
const Todo = require('../models/todo');
const router = express.Router();

// const activeController = require('../controllers/activeController');


// listening for requests
router.get('/', async(req, res)=>{
    const url = '/completed';
    const completedTodo = await Todo.find({completed: true});
    res.render('index', {todo: completedTodo, url: url });
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

module.exports = router;