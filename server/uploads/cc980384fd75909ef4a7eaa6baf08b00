require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cookieParser = require('cookie-parser')
const errorMiddleware= require('./middleware/errorHandlingMiddleware')
const path = require('path')
const router = require('./router/index')
const cors = require('cors')
const {MnemoGroup} = require("./models/models");
const PORT = process.env.PORT || 3001

const app = express()

app.use(cors())
app.use(express.json({limit: '25mb'}));
app.use(cookieParser())
app.use('/api', router)

app.use(express.static(path.resolve(__dirname, 'static')))
app.use(require('express-formidable')());

// Обработка ошибок middleware
app.use(errorMiddleware)
const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`)
        })
    }
    catch(e){
        console.log(e)
    }
}

start()