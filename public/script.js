$(document.readyState(async function(){
    const todos = await $.getJSON('/');
}));

function showTodos(todos){
    for(let item of todos){
        showTodo(item)
    }
}
function showTodo(todo){
    let lem = $(`<li><div><input class="toggle" name="check" type="checkbox" action="/completed/${todos._id}" method="POST">
        <label id="${todos._id}">${todos.todo}</label>
        <a href="/delete-todo/${todos._id}" class="destroy">
            <img src="x.png" alt="X">
        </a>    
    </div>
</li>`);
$('#ull').prepend(elem);
elem.data('id', todo._id);
elem.data('Completed', todo.Completed);
}