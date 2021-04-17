//todo_index, todo_details, todo_create_get, todo_create, todo_delete
// const express= require('express');
const Todo = require('../models/todo');

const active_index = (req, res)=>{
    res.get('/active', async(req, res)=>{
        const activeTodo = await Todo.find({completed: false});
        res.render('index', {todo: activeTodo });
    });
}

const todo_create = (req,res) =>{
    res.get('/new-todo', (req, res)=>{
            const todo = new Todo({
            });
            todo.save()
                .then((result) =>{
                    res.redirect('/');
                })
                .catch((err) =>{
                    console.log(err)
                });
        });
}

module.exports = {
    active_index,
    todo_create,

}