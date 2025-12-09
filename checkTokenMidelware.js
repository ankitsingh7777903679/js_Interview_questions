let myTocken = "12345";
let checkTocken = (req, res, next)=>{

    if(req.query.token==undefined || req.query.token==""){
       return res.send({
        status:0,
        message:"Please fill the tocken"
       })
    }

    if(req.query.token!=myTocken){
        return res.send({
            status:0,
            message:"pleace fill the correct question"
        })
    }
    next()
}

module.exports = {checkTocken}