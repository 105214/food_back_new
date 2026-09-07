import mongoose from "mongoose";



const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
       type:String,
       required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String
    }

},
{timestamps:true})


const Admin = mongoose.model('Admin',adminSchema)
export default Admin