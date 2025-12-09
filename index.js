let express = require('express');
let app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send({status:1, message:"Server is running"});
})

app.get('/product', (req, res) => {
    res.send({status:1, message:"Product route"});
})

app.post('/login', (req, res) => {
    console.log(req.body);
    res.send({status:1, message:"Login route"});
})

app.listen('3000',()=>{
    console.log("Server is running on http://localhost:3000");
})