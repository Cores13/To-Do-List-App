const express = require('express');
const mongoose = require('mongoose');
const Todo = require('./models/todo.js');
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



app.use(todoRoutes);
//404 page
app.use((req, res)=>{
    res.status(404).sendFile('./views/404.html', {root: __dirname});
});
