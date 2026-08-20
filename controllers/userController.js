import Cloudinary from "../config/cloudinary.js"
import User from "../models/userModel.js"
import bcrypt from 'bcrypt'
import generateToken from "../utils/generateToken.js"

const Signup = async(req,res)=>{
    try {
   
        const{name,email,password,image,phone,address}=req.body
        
        if(!name || !email || !password || !phone || !address){
            return res.status(400).json({message:"All fields required"})
        }

        const userExist = await User.findOne({email})

        if(userExist){
            return res.status(400).json({message:"User already exist"})
        }

        let userImage
        if(req.file){

            userImage = await Cloudinary.uploader.upload(req.file.path)
        }

        let salt =10
        const hashPassword = await bcrypt.hash(password,salt)

        const user = new User({
            name,
            email,
            password:hashPassword,
            image:userImage?.secure_url,
            phone,
            address
        })

        await user.save()
        res.status(200).json({message:"Profile created",data:user})
    } catch (error) {
        console.log(error)
       res.status(500).json({message:"signup Internal server error"}) 
    }
}


const Login = async (req,res)=>{
    try {

        const {email,password} =req.body

        if(!email || !password){
            return res.status(400).json({message:"All fields required"})
        }

        // check user exist 

        const userExist = await User.findOne({email})

        if(!userExist){
            return res.status(404).json({message:"User not found"})
        }
        // password matching

        const passwordChecking = await bcrypt.compare(password,userExist.password)

        if(!passwordChecking){
            return res.status(400).json({message:"invalid credantials"})
        }
        // generate tokken

        const token = await generateToken(userExist.id)

        res.status(200).json({message:"Login successfull",data:{id:userExist.id,email:userExist.email},token})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}


const profileUpdate = async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
}
export {Signup,Login}