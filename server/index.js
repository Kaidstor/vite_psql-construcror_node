require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {json} = require("express");
const {db} = require("./database/db");
const router = require("./routes");
const path = require("path");

const app = express()
const PORT = process.env.PORT || 3001

app.use(json())
app.use(cors())

app.use(express.static(path.resolve(__dirname, 'uploads')))

app.use('/api', router)

const start = async () => {
   try{
      await db.authenticate()
      await db.sync()
      // await TableModel.sync({ force: true });

      app.listen(PORT, () => {
         console.log(path.resolve(__dirname, 'uploads'))
         console.log(`Example app listening on port ${PORT}`)
      })
   }
   catch(e){
      console.log(e)
   }
}

start()