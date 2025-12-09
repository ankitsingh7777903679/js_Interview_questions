let express = require('express');
const { checkTocken } = require('./checkTokenMidelware');
require('dotenv').config();
let app = express();

app.use(express.json());

let mypass = "ank@123";

// let checkTocken = (req, res, next)=>{
//     console.log(req.query.token)

//     if(req.query.token==undefined || req.query.token==""){
//        return res.send({
//         status:0,
//         message:"Please fill the tocken"
//        })
//     }

//     if(req.query.token!=myTocken){
//         return res.send({
//             status:0,
//             message:"pleace fill the correct question"
//         })
//     }
//     next()
// }

// app.use(checkTocken) //modleware

// app.use((req, res, next)=>{
//     console.log(req.query.pass)

//     if(req.query.pass==undefined || req.query.pass==""){
//        return res.send({
//         status:0,
//         message:"Please fill the mypassword"
//        })
//     }

//     if(req.query.pass!=mypass){
//         return res.send({
//             status:0,
//             message:"pleace fill the correct password"
//         })
//     }
//     next()
// })

app.get('/', (req, res) => {
    res.send({status:1, message:"Server is running"});
})

app.get('/product',checkTocken, (req, res) => {
    res.send({status:1, message:"Product route"});
})

app.get("/product/:id", (req, res) => {
    let productId = req.params.id;
    res.send("product id is" + productId)
});

app.post('/login', (req, res) => {
    console.log(req.body);
    res.send({
        status:1,
         message:"Login route",
        Bodydata:req.body,
        querydata:req.query
    });
})

app.listen('3000',()=>{
    console.log("Server is running on http://localhost:3000");
})