import Cloudinary from "../config/cloudinary.js"
import Admin from "../models/adminModel.js"
import upload from "../middleware/multer.js"
import bcrypt from 'bcrypt'
import generateToken from "../utils/generateToken.js"

const adminSignup = async(req,res)=>{
    try {
        const {name,email,password,image,phone}=req.body

        if(!name || !email || !password || !phone){
            return res.status(400).json({message:"All fields are required"})
        }

        const adminExist = await Admin.findOne({email})

        if(adminExist){
            return res.status(409).json({message:"Admin already exist"})
        }


        const saltRound=10
        const hashed =await bcrypt.hash(password,saltRound)

        let imageUrl = ''
        if(req.file){
            const cloudImage = await Cloudinary.uploader.upload(req.file.path)
             imageUrl=cloudImage.secure_url
        }

        const admin = new Admin({name,
            email,
            password:hashed,
            image:imageUrl,
            phone
        })

       await admin.save()
        res.status(201).json({message:"Profile created",data:{
            id:admin.id,
            email:admin.email,
            image:admin.image,
            phone:admin.phone

        }})
        } catch (error) {
            console.log(error)
        res.status(500).json({message:"internal server error"})
    }
}

const adminLogin = async(req,res)=>{
    try {
        const {email,password}=req.body

        if(!email || !password){
            return res.status(400).json({message:"All fields are required"})
        }
        const adminExist = await Admin.findOne({email})

        if(!adminExist){
            return res.status(404).json({message:"Admin not found"})
        }

        const passwordVerify= await bcrypt.compare(password,adminExist.password)

        if(!passwordVerify){
            return res.status(400).json({message:"Invalid credentials"})
        }

        const token =await generateToken(adminExist.id)

        res.cookie("token",token,{
            httpOnly:true,
            secure:false
        })


        res.status(200).json({message:"Login successfull",data:{id:adminExist.id,email:adminExist.email},token})
    } catch (error) {
        console.log(error)
        res.status(500).json({messsage:"internal server error"})
    }
}


const adminUpdate = async(req,res)=>{
    try {
        const id = req.params.id
        const {name,email,password,phone}=req.body

        if(!id){
            return res.status(404).json({message:"Admin not found"})
        }
const update = {}
        if(name){
            update.name=name
        }
        if(email){
            update.email=email
        }

        if(req.file){
            update.image = req.file.path
        }

        if(password){
            let saltRound = 10
           const hashPassword =await bcrypt.hash(password,saltRound)
           update.password = hashPassword
        }

        if(phone){
            update.phone = phone
        }

        const newAdmin = await Admin.findByIdAndUpdate(id,update,
            {new:true,
           runValidators:true})

           if(!newAdmin){
            return res.status(404).json({message:"Admin not found"})
           }
        res.status(200).json({message:"Update successfully",data:newAdmin})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server errorupdate"})
    }
}


const profileDelete=async(req,res)=>{

    try {
         const id = req.params.id

         const remove = await Admin.findByIdAndDelete(id)

         if(!remove){
            return res.status(404).json({message:"Admin not found"})
         }

         res.status(200).json({message:"Profile deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}
export {adminSignup,adminLogin,adminUpdate,profileDelete}