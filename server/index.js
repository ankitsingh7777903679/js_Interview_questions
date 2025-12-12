let express = require('express')
let mongoose = require('mongoose')
const enquiryRouter = require('./App/routes/web/enquiryRoutes')
let cors = require('cors')

let app = express()
app.use(cors())
require('dotenv').config()

app.use(express.json())
app.use('/api/website/enquiry',enquiryRouter)

// mongoDB connection
mongoose.connect(process.env.DBURL).then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log("Server is running on http://localhost:"+process.env.PORT);
    })
}).catch((err)=>{
    console.log("Error in DB connection: "+err.message);
})

