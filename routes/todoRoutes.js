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
            //delete div ???????????????
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
        document.getElementById('list').remove();
        res.redirect("/");
    })
    .catch((err)=>{
        console.log(err);
    });
});
router.get('/active', async (req, res)=>{
    const activeTodo = await Todo.find({completed: false});
    res.render('index', {todo: activeTodo})
});
router.get('/completed', (req, res)=>{
    res.render('completed');
});



module.exports = router;