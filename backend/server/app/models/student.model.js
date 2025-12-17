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
        required: true
        // Note: We removed unique:true from here to use the custom index below
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'active', 'suspend', 'delete'],
        default: "pending"
    }
}, { timestamps: true })

// ★ IMPORTANT: This index allows duplicate emails ONLY if the status is 'delete'
// If status is 'pending', 'active', or 'suspend', the email must be unique.
studentSchema.index(
    { email: 1 }, 
    { 
        unique: true, 
        partialFilterExpression: { status: { $ne: "delete" } } 
    }
);

let studentModel = mongoose.model('student', studentSchema)
module.exports = { studentModel }