let express = require('express')
const { dbConnection } = require('./dbConnection')
const { ObjectId } = require('mongodb')
let app = express()

app.use(express.json())

app.get('/student-view',async (req,res)=>{
    let myDB = await dbConnection();
    let studentCollection = myDB.collection("student")

    let data = await studentCollection.find().toArray()

    let resobj = {
        status:1,
        message:"show data",
        data
    }

    res.send(resobj)
})

app.post('/student-insert',async (req,res)=>{
    let myDB = await dbConnection();
    let studentCollection = myDB.collection("student")

    let {sName, sEmail} = req.body

    let obj = {sName, sEmail}

    let checkEmail = await studentCollection.findOne({sEmail})
    if(checkEmail){
        return res.send({status:0, message:"Email already exists"})
    }
    
    let insertRes = await studentCollection.insertOne(obj)

    let resobj = {
        status:1,
        message:"Data Inserted",
        insertRes
    }

    res.send(resobj)
})

app.delete('/student-delete/:id', async(req, res)=>{
    let myDB = await dbConnection();
    let studentCollection = myDB.collection("student")
    let {id} = req.params; //{id:3}

    let delres = await studentCollection.deleteOne({_id:new ObjectId(id)})
   
    
    let resobj = {
        status:1,
        message:"Data delete",
        delres
    }

    res.send(resobj)


})
app.put('/student-update/:id', async(req, res) => {
    
    let {id} = req.params; // where
    let {sName, sEmail} = req.body

    let obj = {}
    if(sName!== "" && sName !== undefined && sName !== null){
        obj['sName'] = sName
    }
    if(sEmail!== "" && sEmail !== undefined && sEmail !== null){
        obj['sEmail'] = sEmail
    }

    let myDB = await dbConnection();
    let studentCollection = myDB.collection("student")

    let updateRes = await studentCollection.updateOne(
        {
            _id:new ObjectId(id),
        },
        {
            $set:{
               obj
            }
        }
    )

    let resobj = {
        status:1,
        message:"Data Update",
        updateRes
    }

    res.send(resobj)
})

app.listen(8000, ()=>{
    console.log("Server is running on http://localhost:8000");
})