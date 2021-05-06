const express= require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json()

//Routes
router.get('/',todoController.home_index);
router.get('/editing/:_id',todoController.editing);
router.post('/new-todo', todoController.todo_create);
router.delete('/delete/:_id',todoController.todo_delete);
router.put('/check/:_id', todoController.todo_check);
router.delete('/clear-completed',todoController.todo_clear_completed);
router.put('/change/:_id',jsonParser, todoController.todo_change); //PUT REQ /change/:_id
router.get('/toggle-all', todoController.todo_toggle_all); //PUT REQ

module.exports = router;