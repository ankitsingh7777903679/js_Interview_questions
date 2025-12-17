const { studentModel } = require("../../models/student.model")

let test = (req, res) => {
    res.send("hello from student controller")
}

// 1. INSERT STUDENT
let studentInsert = async (req, res) => {
    let { name, rollno, email, phone } = req.body;

    try {
        // Step 1: Check if email exists in Active/Suspend/Pending
        // We look for any user with this email who is NOT deleted.
        let existingStudent = await studentModel.findOne({ 
            email: email, 
            status: { $ne: 'delete' } 
        });
        
        if (existingStudent) {
            return res.send({ 
                status: 0, 
                message: "Email already exists! (User is Active, Pending, or Suspended)" 
            });
        }

        // Step 2: Create new student (Default status: pending)
        let student = new studentModel({
            name,
            rollno,
            email,
            phone,
            status: "pending"
        });

        await student.save();
        res.send({ status: 1, message: "Student Inserted Successfully" });
        
    } catch (err) {
        // Handle MongoDB Duplicate Key Error (Safety net)
        if(err.code === 11000) {
            return res.send({ status: 0, message: "Email already exists." });
        }
        res.send({ status: 0, message: "Error inserting student", error: err });
    }
}

// 2. LIST STUDENTS
let studentList = async (req, res) => {
    try {
        // Show newest first
        let data = await studentModel.find().sort({ createdAt: -1 });
        res.send({ status: 1, data: data })
    } catch (err) {
        res.send({ status: 0, error: err })
    }
}

// 3. GET ONE (For Edit)
let studentListOne = async (req, res) => {
    let id = req.params.id
    try {
        let data = await studentModel.findOne({ _id: id });
        res.send({ status: 1, data: data })
    } catch (err) {
        res.send({ status: 0, error: err })
    }
}

// 4. UPDATE STUDENT
let studentUpdate = async (req, res) => {
    let id = req.params.id;
    let { name, rollno, email, phone } = req.body;
    try {
        await studentModel.updateOne({ _id: id }, { name, rollno, email, phone });
        res.send({ status: 1, message: "Student Updated Successfully" })
    } catch (err) {
        res.send({ status: 0, error: err })
    }
}

// 5. DELETE (Soft Delete -> Set status to 'delete')
let studentDelete = async (req, res) => {
    let id = req.params.id;
    try {
        await studentModel.updateOne({ _id: id }, { status: "delete" });
        res.send({ status: 1, message: "Student Moved to Deleted Status" })
    } catch (err) {
        res.send({ status: 0, error: err })
    }
}

// 6. SET STATUS (Dropdown)
let studentSetStatus = async (req, res) => {
    let id = req.params.id;
    let { status } = req.body;
    try {
        await studentModel.updateOne({ _id: id }, { status: status });
        res.send({ status: 1, message: "Status Updated", data: status })
    } catch (err) {
        res.send({ status: 0, error: err })
    }
}

// Check Email (Optional helper)
let checkEmailStatus = async (req, res) => {
    // Basic logic if needed separately
    res.send({ status: 1, message: "check email route working" })
}

module.exports = { studentInsert, test, studentList, studentListOne, studentUpdate, studentDelete, studentSetStatus, checkEmailStatus }