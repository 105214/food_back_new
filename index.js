import express from 'express'
import MongoDb from './config/dbConfig.js'
import 'dotenv/config' 
const app= express()
const port = process.env.PORT


MongoDb()
app.get('/',(req,res)=>{
    console.log("welcome home")
})
app.listen(port,()=>{
    console.log(`app running on ${port}`)
})