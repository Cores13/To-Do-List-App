const express= require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

//Routes
router.get('/',todoController.home_index);
router.get('/editing/:_id',todoController.editing);
router.post('/new-todo', todoController.todo_create);
router.delete('/delete/:_id',todoController.todo_delete);
router.put('/check/:_id', todoController.todo_check); //PUT REQ
router.get('/clear-completed',todoController.todo_clear_completed); //DELETE REQ
router.post('/change-todo/:_id', todoController.todo_change); //PUR REQ /change/:_id
router.get('/toggle-all', todoController.todo_toggle_all); //PUT REQ

module.exports = router;