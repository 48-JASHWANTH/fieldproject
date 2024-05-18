const express = require("express");
const app = express()
require("dotenv").config();


//express error handler
app.use((error,request,response,next)=>{
    response.send({message:'error',payload:error.message})
})

//Assign port number
const port = process.env.PORT || 7777;
app.listen(port, () => console.log(`Web server running on port ${port}`));
