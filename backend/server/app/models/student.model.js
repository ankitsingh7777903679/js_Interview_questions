// use for making student model schema and export it to use in other files
let mongoose = require('mongoose')
let Schema = mongoose.Schema

let studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rollno: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        // unique: true
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "default"
    }
})

let studentModel = mongoose.model('student', studentSchema)
module.exports = { studentModel }