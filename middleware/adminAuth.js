import jwt from 'jsonwebtoken'


const adminAuth = (req,res,next)=>{
    console.log("hitted");
    
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({message:"Unauthorized"})
        }

        const decodedToken = jwt.verify(token,process.env.JWT_SECRET)

       
        req.admin = decodedToken
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
        
    }
}

export default adminAuth