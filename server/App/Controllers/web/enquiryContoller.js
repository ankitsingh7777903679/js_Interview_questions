const enquiryModel = require("../../models/enquiry.model");

let enquiryInsert =(req, res) => {
    let {name, email, phone, message} = req.body;
    let enquiry =new enquiryModel ({
        name,
        email,
        phone,
        message,
    })

    enquiry.save().then(()=>{
        res.send({status:1, message:"Enquire inserted successfully"})
    }).catch((err)=>{
        res.send({status:0, message:"err: ",error:err})
    })
}

let enquiryList =async (req, res) =>{
   await enquiryModel.find().then((data)=>{
        res.send({status:1, data:data})
    }).catch((err)=>{
        res.send({status:0, message:err})
    })
}

let enquiryDelete = async (req, res) => {
    let id = req.params.id;
    await enquiryModel.findByIdAndDelete(id).then(()=>{
        res.send({status:1, message:"Enquiry deleted successfully"})
    })

}
let enquirySingleRow = async(req, res) =>{
    let id = req.params.id;
    await enquiryModel.findOne({_id: id}).then((data)=>{
        console.log(data);
        res.send({status:1, data:data})
    }).catch((err)=>{
        res.send({status:0, message:err})
    })
}

let enquiryUpdate = async(req, res) =>{
    let id = req.params.id;
    let {name, email, phone, message} = req.body;
    let updateObj = {
        name,
        email,
        phone,
        message,
    }
    await enquiryModel.updateOne({_id: id}, updateObj).then((data)=>{
        console.log(data);
        res.send({status:1, data:data})
    }).catch((err)=>{
        res.send({status:0, message:err})
    })
}

module.exports = {enquiryInsert, enquiryList, enquiryDelete, enquirySingleRow, enquiryUpdate};