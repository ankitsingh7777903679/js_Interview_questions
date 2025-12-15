let express = require('express')
let mongoose = require('mongoose')
let cors = require('cors')
const { studentRoutes } = require('./app/routes/web/studentRoutes')
require('dotenv').config()

let app = express()
app.use(cors())
app.use(express.json())

app.use('/api/web/student',studentRoutes)

mongoose.connect(process.env.DBURL).then(()=>
{
    app.listen(process.env.PORT, ()=>{
        console.log("Server is running on http://localhost:"+process.env.PORT);
    })
}).catch((err)=>{
    console.log(err)
})
