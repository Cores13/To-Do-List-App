const express= require('express');
const Todo = require('../models/todo');
const router = express.Router();


// listening for requests
router.get('/', (req, res)=>{
    Todo.find()
        .then((result)=>{
            res.send(result);
            console.log(result);
        })
        .catch((err)=>{
            console.log(err)
        });
});
router.get('/active', (req, res)=>{
    Todo.find().sort({completed: false})
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            console.log(err)
        });
});
router.get('/completed', (req, res)=>{
    
});

module.exports = router;