const express= require('express');
const Todo = require('../models/todo');
const router = express.Router();


// listening for requests
router.get('/', async (req, res)=>{
    const allTodo = await Todo.find();
    res.render('index', {todo: allTodo})
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

router.get('/active', async (req, res)=>{
    const {completed} = req.params;
    const activeTodo = await Todo.find({completed});
    console.log(activeTodo);
    res.render('index', {todo: activeTodo})
});
router.put('/completed/', async(req, res)=>{
    const todo = await Todo.findById(req.params._id);
    for(let key in req.body){
        if(todo[key] != req.body[key]){
            todo[key] = req.body[key];
        }
    }
    try{
        await todo.save();
        res.send(todo);
    }
    catch{
        console.log(err);
    }
});



module.exports = router;