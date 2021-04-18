const express= require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

var edit=false;
router.get('/',todoController.completed_index);
router.post('/new-todo', todoController.todo_create);
router.get('/delete-todo/:_id',todoController.todo_delete);
router.post('/check/:_id', todoController.todo_check);
router.get('/clear-completed',todoController.todo_clear_completed);
router.post('/change-todo/:_id', todoController.todo_change);
router.get('/toggle-all', todoController.todo_toggle_all);

module.exports = router;