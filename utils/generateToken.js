import Jwt from "jsonwebtoken"

const generateToken = async (id)=>{
    try {
        return Jwt.sign({id},process.env.JWT_SECRET,{
            expiresIn:'1d'
        })
    } catch (error) {
      console.log(error)
      res.status(500).json({message:"internal server error"})  
    }
}

export default generateToken