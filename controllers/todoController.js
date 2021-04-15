//todo_index, todo_details, todo_create_get, todo_create_post, todo_delete
const todo_index = (req,res) =>{
    app.get('/new-todo', (req, res)=>{
            const todo = new Todo({
            });
            todo.save()
                .then((result) =>{
                    res.send(result);
                    console.log('sent');
                })
                .catch((err) =>{
                    console.log(err)
                });
        });
}