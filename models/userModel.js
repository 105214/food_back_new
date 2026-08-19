import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20,
        trim:true,
    },
    email:{
        type:String,
        required:true,

    },

    image:{
        type:String
    },
    password:{
        type:String,
        required:true,
        minLength:5,
        maxLength:15
    },
    phone:{
        type:Number,
        required:true,
    },
    address:{
        type:String,   
    }
})

const User = mongoose.model("User",userSchema)
export default User