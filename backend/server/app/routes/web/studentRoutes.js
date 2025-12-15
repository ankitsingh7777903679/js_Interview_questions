// make a routs for student
let express = require('express')
const { studentInsert, test, studentList, studentListOne } = require('../../Controllers/web/studentControllers')
let studentRoutes = express.Router()

studentRoutes.get('/test', test)
studentRoutes.post('/insert', studentInsert)
studentRoutes.get('/list', studentList)
studentRoutes.get('/listOne/:id', studentListOne)


module.exports = {studentRoutes}