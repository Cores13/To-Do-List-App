
function changeTodo(req, url){
    //get id of a task
    var txt = req.textContent;
    console.log(txt);
    var fullId =  req.id;
    fullId = fullId.substring(fullId.indexOf(":")+1);
    //remove label and other elements
    var lab = document.getElementById(`l:${fullId}`);
    lab.remove();
    var i = document.getElementById(`i:${fullId}`);
    i.remove();
    //make form element and give it attributes
    var form = document.createElement('form');
    form.setAttribute('id', `${fullId}`);
    form.setAttribute('action', `${url}/change-todo/${fullId}`);
    form.setAttribute('method', 'POST');
    form.setAttribute('class', 'edit-form');
    //create edit and label elements and give them attributes
    var edit = document.createElement('input');
    edit.setAttribute('id', 'edit');
    edit.setAttribute('class', 'edit');
    edit.setAttribute('type', 'text');
    edit.setAttribute('name', 'todo');
    edit.setAttribute('value',txt);
    //create submit button and give it attributes
    var bt = document.createElement('button');
    bt.setAttribute('type', 'submit');
    bt.setAttribute('id', 'edit-bt');
    bt.hidden=true;
    //append edit to form ellement
    form.appendChild(edit);
    document.getElementById(`f:${fullId}`).appendChild(form);
    document.getElementById(`f:${fullId}`).setAttribute('style', 'padding-top: 0; padding-bottom: 0;')
}
