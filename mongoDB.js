let express = require('express')
let app = express()

app.use(express.json())

app.get('/student', (req,res)=>{
    res.send("student is start")
})

app.listen(8000, ()=>{
    console.log("Server is running on http://localhost:8000");
})