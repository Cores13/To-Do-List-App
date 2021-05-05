//if clicked outside of edit input box the input is submited
document.addEventListener('click', (event)=>{
    if(event.target.closest('.edit')) return

    document.getElementById('edit-bt').click();
});

// FINISH THIS!!!!!!!!!!!!!!!!!!
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

const deleteTask = document.querySelector('a.destroy');
deleteTask.addEventListener('click', (e) => {
    const endpoint = `/delete/${deleteTask.dataset.delete}`;

    fetch(endpoint, {
        method: 'DELETE',
    })
    .then((response) => response.json())
    .then((data)=> window.location.href = data.redirect)
    .catch(err => console.log(err))
});

const clearCompleted = document.querySelector('a.clear');
clearCompleted.addEventListener('click', (e) => {
    const endpoint = `/clear-completed/`;

    fetch(endpoint, {
        method: 'DELETE',
    })
    .then((response) => response.json())
    .then((data)=> window.location.href = data.redirect)
    .catch(err => console.log(err))
});

    function goTo(req, url){
    var fullId =  req.id;
    fullId = fullId.substring(fullId.indexOf(":")+1);
    location.replace(`http://localhost:3000${url}/editing/${fullId}`);
}


// function changeTodo(req, url){
    //     //get id of a task
    //     var txt = req.textContent;
    //     var fullId =  req.id;
    //     fullId = fullId.substring(fullId.indexOf(":")+1);
    //     //remove label and other elements
    //     var lab = document.getElementById(`l:${fullId}`);
    //     lab.remove();
    //     var i = document.getElementById(`i:${fullId}`);
    //     i.remove();
    //     var c = document.getElementById(`c:${fullId}`);
    //     c.remove();
    //     //make form element and give it attributes
    //     var form = document.createElement('form');
    //     form.setAttribute('id', `${fullId}`);
    //     form.setAttribute('action', `${url}/change-todo/${fullId}`);
    //     form.setAttribute('method', 'POST');
    //     form.setAttribute('class', 'edit-form');
    //     //create edit and label elements and give them attributes
    //     var edit = document.createElement('input');
    //     edit.setAttribute('id', 'edit');
    //     edit.setAttribute('class', 'edit');
    //     edit.setAttribute('type', 'text');
    //     edit.setAttribute('name', 'todo');
    //     edit.setAttribute('value',txt);
    //     edit.autofocus = true;
    //     //create submit button and give it attributes
    //     var bt = document.createElement('button');
    //     bt.setAttribute('type', 'submit');
    //     bt.setAttribute('id', 'edit-bt');
    //     bt.hidden=true;
    //     //append edit to form ellement
    //     form.appendChild(edit);
    //     form.appendChild(bt);
    //     // document.getElementById(`l:${fullId}`).setAttribute('ondblclick', 'a');
    //     document.getElementById(`f:${fullId}`).appendChild(form);
    //     document.getElementById(`f:${fullId}`).setAttribute('style', 'padding-top: 0; padding-bottom: 0;');
    // }
