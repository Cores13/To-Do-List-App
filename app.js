const express = require('express');
const mongoose = require('mongoose');
const todoRoutes =require('./routes/todoRoutes.js');
// const Todo =require('./models/todo.js');


//express app
const app = express();
app.set('view engine', 'ejs');
//Connect to a database and start a listener on port 3000
const dbURL ='mongodb+srv://user1:123@cluster0.kg6rz.mongodb.net/todo-database?retryWrites=true&w=majority';
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result)=> app.listen(3000))
    .catch((err)=> console.log(err));


app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));


// //Save a todo
// app.get('/new-todo', (req, res)=>{
//     const todo = new Todo({
//         task: 'asfi',
//     });
//     todo.save()
//         .then((result) =>{
//             res.send(result);
//             console.log('sent');
//         })
//         .catch((err) =>{
//             console.log(err)
//         });
// });

// // Get all todos
// app.get('/all-todos', (req, res)=>{
//     Todo.find()
//         .then((result)=>{
//             res.send(result);
//         })
//         .catch((err)=>{
//             console.log(err)
//         });
// });

// //Get active
// app.get('/active', (req, res)=>{
//     Todo.find().sort({completed: false})
//     .then(()=>{
//         res.send(result)
//     })
//     .catch((err)=>{
//         console.log(err)
//     });
// })

// todo routes


// listening for requests
app.get('/', (req, res)=>{
    res.render('index');
    // res.sendFile('./views/index.html', {root: __dirname});
});
app.get('/active', (req, res)=>{
    res.render('active');
    // res.sendFile('./views/active.html', {root: __dirname});
});
app.get('/completed', (req, res)=>{
    res.render('completed')
    // res.sendFile('./views/completed.html', {root: __dirname});
});

app.use(todoRoutes);
//404 page
app.use((req, res)=>{
    res.status(404).sendFile('./views/404.html', {root: __dirname});
});
