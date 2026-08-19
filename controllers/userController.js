import Cloudinary from "../config/cloudinary.js"
import User from "../models/userModel.js"
import {bcrypt} from 'bcrypt'

const Signup = async(req,res)=>{
    try {
        const{name,email,password,image,mobile,address}=req.body
        
        if(name,email,password,mobile,address){
            return res.status(400).json({message:"All fields required"})
        }

        const userExist = await User.find({email})

        if(userExist){
            return res.status(400).json({message:"User already exist"})
        }

        const userImage = await Cloudinary.uploader.upload(req.file.path)

        let salt =10
        const hashPassword = await bcrypt.hash(password,salt)

        const user = new User({
            name,
            email,
            password:hashPassword,
            image:userImage,
            mobile,
            address
        })

        await user.save()
        res.status(200).json({message:"Profile created",data:user})
    } catch (error) {
        console.log(error)
       res.status(500).json({message:"Internal server error"}) 
    }
}


export {Signup}