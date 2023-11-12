const express = require('express');
const router = express.Router();
//import controller
const StudentController = require('../controllers/StudentController');

// get all students 
router.get('/allStudents', StudentController.getStudents);
//create a student
router.post('/createStudent', StudentController.createStudent);
//get student with a registration;
router.get('/:registration', StudentController.getOneStudent);
// delete student with registration
router.delete('/:registration', StudentController.deleteStudent);
module.exports = router;