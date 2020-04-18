const express = require('express');
const app = express();
const route = require('./Routes/BulbState')
require('dotenv').config()
const mongoose = require("mongoose");

app.use(express.json())
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*')
   res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
   next()
})

app.use(route)


mongoose.connect(process.env.MONGOOSE_CONNECT)
   .then(() => {
      app.listen(process.env.PORT || 5000, () => {
         console.log("Dev Server Running at http://localhost:5000")
      })
   })
   .catch(err=>{
      console.log(err)
   })
