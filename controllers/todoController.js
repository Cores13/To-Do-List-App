const Todo = require('../models/todo');

var edit=false;
var ide;
var selected;
var url;

const active_index = async (req, res)=>{
    url = '/active';
    const activeTodo = await Todo.find({completed: false});
    var count = activeTodo.length;
    const allTodo = await Todo.find();
    var all = allTodo.length;
    const completedTodo = await Todo.find({completed: true});
    var comp =completedTodo.length;
    edit=false;
    selected='active';
    res.render('index', {todo: activeTodo, url: url, count: count, all: all, edit: edit, comp: comp, ide:ide, selected: selected});
}
const home_index = async (req, res)=>{
    url = '';
    const allTodo = await Todo.find();
    const activeTodo = await Todo.find({completed: false});
    var count = activeTodo.length;
    var all = allTodo.length;
    const completedTodo = await Todo.find({completed: true});
    var comp =completedTodo.length;
    edit=false;
    selected='all';
    res.render('index', {todo: allTodo, url: url, count: count, all:all, edit: edit, comp : comp, ide:ide, selected: selected});
}

const completed_index = async (req, res)=>{
    url = '/completed';
    const completedTodo = await Todo.find({completed: true});
    const activeTodo = await Todo.find({completed: false});
    const allTodo = await Todo.find();
    var count = activeTodo.length;
    var all = allTodo.length;
    var comp =completedTodo.length;
    edit=false;
    selected='completed';
    res.render('index', {todo: completedTodo, url: url, count: count, all: all, edit:edit, comp: comp, ide:ide, selected: selected});
}

const editing_completed = async(req, res)=>{
    const todoCh = await Todo.findById(req.params._id);
    ide = todoCh._id;
    edit=true;
    url='/completed';
    const completedTodo = await Todo.find({completed: true});
    const activeTodo = await Todo.find({completed: false});
    const allTodo = await Todo.find();
    var count = activeTodo.length;
    var all = allTodo.length;
    var comp =completedTodo.length;
    selected = 'completed';
    
    res.render('index', {todo: completedTodo, url: url, count: count, all: all, edit:edit, comp: comp, ide:ide, selected: selected});
}
const editing_active = async(req, res)=>{
    const todoCh = await Todo.findById(req.params._id);
    ide = todoCh._id;
    url = '/active';
    const activeTodo = await Todo.find({completed: false});
    var count = activeTodo.length;
    const allTodo = await Todo.find();
    var all = allTodo.length;
    const completedTodo = await Todo.find({completed: true});
    var comp =completedTodo.length;
    edit=true;
    selected='active';

    res.render('index', {todo: activeTodo, url: url, count: count, all: all, edit: edit, comp: comp, ide:ide, selected: selected});
}
const editing = async(req, res)=>{
    const todoCh = await Todo.findById(req.params._id);
    ide = todoCh._id;
    url = '';
    const allTodo = await Todo.find();
    const activeTodo = await Todo.find({completed: false});
    var count = activeTodo.length;
    var all = allTodo.length;
    const completedTodo = await Todo.find({completed: true});
    var comp =completedTodo.length;
    edit=true;
    selected='all';
    
    res.render('index', {todo: allTodo, url: url, count: count, all:all, edit: edit, comp : comp, ide:ide, selected: selected});
}
const todo_create = (req,res) =>{
    edit=false;
    const {todo} = req.body;
    const newTodo = new Todo({todo})
    newTodo.save()
        .then((result) =>{
            res.redirect('back');
        })
        .catch((err) =>{
            console.log(err)
        });
}

const todo_delete = (req, res)=>{
    edit=false;
    const {_id} = req.params;
    Todo.deleteOne({_id})
    .then(()=>{
        res.redirect("back");
    })
    .catch((err)=>{
        console.log(err);
    });
}

const todo_check = async(req, res)=>{
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
    edit=false;
    res.redirect('back');
}

const todo_clear_completed = (req, res)=>{
    edit=false;
    Todo.deleteMany({completed : true})
    .then(()=>{
        res.redirect("back");
    })
    .catch((err)=>{
        console.log(err);
    });
}

//Change todo
const todo_change = async (req, res)=>{
    const todoVal = req.body.todo;
    const todoCh = await Todo.findById(req.params._id);
    edit=false;
    Todo.updateOne({_id: todoCh._id},{todo: todoVal}, function (err, res){
        if(err) throw err;
    });
    switch(url){
        case '':
            res.redirect('/');
            break;
        case '/active':
            res.redirect('/active');
            break;
        case '/completed':
            res.redirect('/completed');
            break;
    }
    // res.redirect('back');
}

//Toggle-all
const todo_toggle_all = async (req, res) =>{
    edit=false;
    const allTodo = await Todo.find();
    Todo.updateMany({completed: false},{completed: true}, function (err, res){
        if(err) throw err;
    });
    res.redirect('back');
}

module.exports = {
    completed_index,
    home_index,
    active_index,
    todo_create,
    todo_delete,
    todo_check,
    todo_clear_completed,
    todo_change,
    todo_toggle_all,
    editing_completed,
    editing_active,
    editing,
}