const express = require('express');
const app = express();
const route = require('./Routes/BulbState')

app.use(express.json())

app.use(route)


app.listen(5000,()=>{
   console.log("Dev Server Running at http://localhost:5000")
})