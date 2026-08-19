import {v2 as cloudinary} from 'cloudinary'


const Cloudinary = async (req,res)=>{
    try {
       cloudinary.config({
        cloud_name :process.env.CLOUD_NAME,
        api_key :process.env.API_KEY,
        api_secret:process.env.API_SECRET
       }) 
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"internal server error"})
    }
}


export default Cloudinary