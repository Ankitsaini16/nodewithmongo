const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {mongourl} = require('./secret.js');
require('./models/schema.js')
const userRouter = require('./routes/authy.js');

const port = 3000;

console.log("app.js loaded");
console.log(mongourl);


// connect mongodb:
mongoose.connect(mongourl) 

// true case - established
mongoose.connection.on("connected" , ()=>{console.log("connected to mongo")})


// false case - not established
mongoose.connection.on("error" , (err)=>{console.log("error connecting to mongo", err)})



app.use(express.json());

app.use("/api/auth",userRouter);


app.listen(port, () => {
  console.log(`Authy app listening at http://localhost:${port}`)
})