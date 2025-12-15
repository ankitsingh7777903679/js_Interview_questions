// making for student routes functionality
const {studentModel} = require("../../models/student.model")

let test = (req, res)=>{
    res.send("hello from student controller")
}

let studentInsert = (req, res)=>{
    let {name, rollno, email, phone} = req.body;
    let student =new studentModel({
        name, 
        rollno,
        email,
        phone
    })

    student.save().then(()=>{
        res.send({status:1, message:"inserted Data"})
    }).catch((err)=>{
        res.send({status:0, message:"err", error:err})
    })
}
let studentList =async (req, res) =>{
    await studentModel.find().then((data)=>{
        res.send({status:1, data:data})
    }).catch((err)=>{
        res.send({status:0, error: err})
    })
}

let studentListOne = async(req, res)=>{
    let id = req.params.id
    await studentModel.findOne({_id: id}).then((data)=>{
        res.send({status:1, data:data})
    }).catch((err)=>{
        res.send({status:0, error:err})
    })
}


module.exports = {studentInsert, test, studentList, studentListOne}