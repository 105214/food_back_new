import mongoose from "mongoose"


const MongoDb = async(req,res)=>{

    try {
       await mongoose.connect(process.env.MONGODB_URL)
        console.log('Database connected successfully')
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Database connection failed"})
    }
}

export default MongoDb