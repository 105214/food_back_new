const UserAuth = (req,res,next)=>{
    try {
        const token = req.cookies.token

        if(!token){
            return res.status(401).json({message:"Unauthorized person"})
        }

        const decoded = JWT.verify(token,process.env.JWT_SECRET)

        req.user = decoded
        next()
    } catch (error) {
        res.status(500).json({message:"internal server error"})
    }
}