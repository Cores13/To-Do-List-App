const toggleAll = document.querySelector('a.toggle-a');
if(toggleAll){
    toggleAll.addEventListener('click', (e) =>{
        const endpoint = `/toggle-all`;
        fetch(endpoint, {
            method: 'PUT',
        })
        .then((response) => response.json())
        .then((data)=> window.location.href = data.redirect)
        .catch(err => console.log(err))
    });
}
//if clicked outside of edit input box the input is submited
const deleteTask = document.querySelector('a.destroy');
if(deleteTask){
    deleteTask.addEventListener('click', (e) => {
        const endpoint = `/delete/${deleteTask.dataset.delete}`;

        fetch(endpoint, {
            method: 'DELETE',
        })
        .then((response) => response.json())
        .then((data)=> window.location.href = data.redirect)
        .catch(err => console.log(err))
    });
}

const clearCompleted = document.querySelector('a.clear');
if(clearCompleted){
    clearCompleted.addEventListener('click', (e) => {
        const endpoint = `/clear-completed/`;

        fetch(endpoint, {
            method: 'DELETE',
        })
        .then((response) => response.json())
        .then((data)=> window.location.href = data.redirect)
        .catch(err => console.log(err))
    });
}

const editField = document.querySelector('input.edit');
if(editField){
    editField.addEventListener('click', (event)=>{
        if(event.target.closest('.edit')){
            return
        } else{
            console.log('clicked');
            document.getElementById('edit-bt').click();
        }
    });
}

function changeTaskOnEnter(event, req, todoId){
    if(event.keyCode == 13) {
        const changeTask = document.getElementById(req.id);
        const todo = changeTask.value.toString();
        const endpoint = `/change/${todoId}/${todo}`;

        const options ={
            method: 'PUT'
        };
        fetch(endpoint, options)
        .then((response) => response.json())
        .then((data)=> window.location.href = '/' + data.redirect)
        .catch(err => console.log(err))
    }else{
        return
    }
}
function changeTask(req, todoId){
    const changeTask = document.getElementById(req.id);
    const todo = changeTask.value.toString();
    const endpoint = `/change/${todoId}/${todo}`;

    const options ={
        method: 'PUT'
    };
    fetch(endpoint, options)
    .then((response) => response.json())
    .then((data)=> window.location.href = '/' + data.redirect)
    .catch(err => console.log(err))
}

function completeTask (taskId){
    const completeTask = document.getElementById(`${taskId}`);
    const endpoint = `/check/${completeTask.dataset.check}`;
    
    fetch(endpoint, {
        method: 'PUT',
    })
    .then((response) => response.json())
    .then((data)=> window.location.href = data.redirect)
    .catch(err => console.log(err))
}

function goTo(req, url){
    var fullId =  req.id;
    fullId = fullId.substring(fullId.indexOf(":")+1);
    location.replace(`http://localhost:3000${url}/editing/${fullId}`);
}
