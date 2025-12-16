// make a routs for student
let express = require('express')
const { studentInsert, test, studentList, studentListOne, studentUpdate, studentDelete, studentSetStatus, checkEmailStatus } = require('../../Controllers/web/studentControllers')
let studentRoutes = express.Router()

studentRoutes.get('/test', test)
studentRoutes.post('/insert', studentInsert)
studentRoutes.get('/list', studentList)
studentRoutes.get('/listOne/:id', studentListOne)
studentRoutes.put('/update/:id', studentUpdate)
studentRoutes.delete('/delete/:id',studentDelete)
studentRoutes.put('/setStatus/:id', studentSetStatus)
studentRoutes.get('/checkEmailStatus', checkEmailStatus)


module.exports = {studentRoutes}