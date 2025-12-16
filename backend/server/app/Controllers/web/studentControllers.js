// making for student routes functionality
const e = require("express");
const { studentModel } = require("../../models/student.model")

let test = (req, res) => {
    res.send("hello from student controller")
}

let studentInsert = async (req, res) => {
    let { name, rollno, email, phone } = req.body;

    try {
        // Check if email already exists
        let existingStudent = await studentModel.findOne({ email: email });
        
        if (existingStudent) {
            // If email exists and status is active or default, don't insert
            if (existingStudent.status === 'active' || existingStudent.status === 'default') {
                return res.send({ 
                    status: 0, 
                    message: "Email already exists with active or default status" 
                });
            }
            // If status is deactive, allow insertion (continue to save)
        }

        // Create and save new student (for new email OR deactive status)
        let student = new studentModel({
            name,
            rollno,
            email,
            phone,
            status: "default"
        });

        await student.save();
        res.send({ status: 1, message: "inserted Data" });
        
    } catch (err) {
        res.send({ status: 0, message: "Error inserting student", error: err });
    }
}

let checkEmailStatus = async (req, res) => {
    let id = req.params.id;
    let email = req.body.email;

    await studentModel.findOne({ email: email }).then((student) => {
        if (student && student.status === 'deactive') {
            res.send({ status: 1, message: "Student status is deactive", isDeactive: true })
        } else {
            res.send({ status: 0, message: "Student status is not deactive", isDeactive: false })
        }
    }).catch((err) => {
        res.send({ status: 0, message: "Error", error: err })
    })
}

let studentList = async (req, res) => {
    await studentModel.find().then((data) => {
        res.send({ status: 1, data: data })
    }).catch((err) => {
        res.send({ status: 0, error: err })
    })
}

let studentListOne = async (req, res) => {
    let id = req.params.id
    await studentModel.findOne({ _id: id }).then((data) => {
        res.send({ status: 1, data: data })
    }).catch((err) => {
        res.send({ status: 0, error: err })
    })
}

let studentUpdate = async (req, res) => {
    let id = req.params.id;
    let { name, rollno, email, phone } = req.body;
    let studentObj = {
        name,
        rollno,
        email,
        phone
    }
    await studentModel.updateOne({ _id: id }, studentObj).then((data) => {
        res.send({ status: 1, message: "update student data", data: data })
    }).catch((err) => {
        res.send({ status: 0, error: err })
    })
}

let studentDelete = async (req, res) => {
    let id = req.params.id;
    await studentModel.deleteOne({ _id: id }).then((data) => {
        res.send({ status: 1, message: "delete student", data: data })
    }).catch((err) => {
        res.send({ status: 0, error: err })
    })
}
let studentSetStatus = async (req, res) => {
    let id = req.params.id;
    let { status } = req.body;
    await studentModel.updateOne({ _id: id }, { status: status }).then((data) => {
        res.send({ status: 1, message: "status updated", data: data })
    }).catch((err) => {
        res.send({ status: 0, error: err })
    })
}

module.exports = { studentInsert, test, studentList, studentListOne, studentUpdate, studentDelete, studentSetStatus, checkEmailStatus }