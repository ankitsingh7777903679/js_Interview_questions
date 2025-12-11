const enquiryModel = require('../../models/querymodel')

let enquiryInsert = (req, res) =>{
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
}

module.exports={enquiryInsert}