let express = require('express');
require('dotenv').config()
let app = express()
let mongoose = require('mongoose');
const enquiryRoutes = require('./app/routes/web/enquiryRoutes');


app.use(express.json())

app.use('/web/api/enquiry', enquiryRoutes)

mongoose.connect(process.env.DBURL).then(()=>{
    console.log("Connect to mongoDB");

    app.listen(process.env.PORT, ()=>{
        console.log("Server is running on http://localhost:"+process.env.PORT);
    })
})