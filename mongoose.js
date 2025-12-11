let express = require('express');
require('dotenv').config()
let app = express()
let mongoose = require('mongoose')
let enquirymodel = require('./models/querymodel')

app.use(express.json())

app.post('/api/enquire-insert', async (req, res)=>{

    let {sName, sEmail, sPhone, sMessage} = req.body
    let enquiry = new enquirymodel({
        name: sName,
        email: sEmail,
        phone: sPhone,
        message: sMessage
    })

    enquiry.save().then(()=>{
        res.send({status:1,message:"Enquiry inserted successfully"})
    }).catch((err)=>{
        res.send({status:0, message:err.message})
    })
})

app.get('/api/enquire-list', async (req, res) =>{
    let enquirylist =await enquirymodel.find()
    res.status(200).json({status:1, message:"Enquiry List", data:enquirylist})

})

app.delete('/api/enquire-delete/:id', async (req, res)=>{
    let enquireId = req.params.id;
    let deletedEnquiry = await enquirymodel.deleteOne({_id:enquireId})

    res.send({status:1, message:"Enquiry deleted successfully", delete: deletedEnquiry})
})

app.put('/api/enquire-update/:id', async (req, res)=>{
    let enquireId = req.params.id;
    let {sName, sEmail, sPhone, sMessage} = req.body
    let updateObj = {
        name: sName,
        email: sEmail,
        phone: sPhone,
        message: sMessage
    }

    let updateResponse = await enquirymodel.updateOne({_id:enquireId}, updateObj)
    res.send({status:1, message:"Enquiry update successfully", update:updateResponse})

})

mongoose.connect(process.env.DBURL).then(()=>{
    console.log("Connect to mongoDB");

    app.listen(process.env.PORT, ()=>{
        console.log("Server is running on http://localhost:"+process.env.PORT);
    })
})