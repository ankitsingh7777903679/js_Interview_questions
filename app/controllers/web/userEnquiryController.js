const enquiryModel = require('../../models/querymodel.js')

let enquiryInsert = (req, res) =>{
    let {sName, sEmail, sPhone, sMessage} = req.body
    let enquiry = new enquiryModel({
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
}

let enquiryList = async (req, res) =>{
    let enquirylist =await enquiryModel.find()
    res.status(200).json({status:1, message:"Enquiry List", data:enquirylist})

}

let enquiryDelete = async (req, res)=>{
    let enquireId = req.params.id;
    let deletedEnquiry = await enquiryModel.deleteOne({_id:enquireId})

    res.send({status:1, message:"Enquiry deleted successfully", delete: deletedEnquiry})
}
let enquiryUpdate = async (req, res)=>{
    let enquireId = req.params.id;
    let {sName, sEmail, sPhone, sMessage} = req.body
    let updateObj = {
        name: sName,
        email: sEmail,
        phone: sPhone,
        message: sMessage
    }

    let updateResponse = await enquiryModel.updateOne({_id:enquireId}, updateObj)
    res.send({status:1, message:"Enquiry update successfully", update:updateResponse})

}

module.exports={enquiryInsert,enquiryList,enquiryDelete, enquiryUpdate}