import Admin from "../models/adminModel.js"


const adminSignup = async(req,res)=>{
    try {
        const {name,email,password,image,phone}=req.body

        if(!name || !email || !password || !phone){
            return res.status(400).json({message:"All fields are required"})
        }

        const adminExist = await Admin.findOne({email})
        if(adminExist){
            return res.status(404).json({message:"Admin not found"})
        }
        } catch (error) {
        
    }
}
export {adminSignup}