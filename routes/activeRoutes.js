const express= require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

//Routes
router.get('/',todoController.active_index);
router.get('/editing/:_id',todoController.editing_active);
router.post('/new-todo', todoController.todo_create);
router.delete('/delete/:_id',todoController.todo_delete);
router.put('/check/:_id', todoController.todo_check);
router.delete('/clear-completed',todoController.todo_clear_completed);
router.put('/change/:_id', todoController.todo_change);
router.get('/toggle-all', todoController.todo_toggle_all);

module.exports = router;