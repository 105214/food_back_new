import express from 'express'
import MongoDb from './config/dbConfig.js'
import 'dotenv/config' 
import router from './routes/index.js'
import cookieParser from 'cookie-parser'
const app= express()
const port = process.env.PORT


MongoDb()
app.use(express.json())
app.use(cookieParser())
app.use('/api',router)
app.get('/',(req,res)=>{
    console.log("welcome home")
})
app.listen(port,()=>{
    console.log(`app running on ${port}`)
})