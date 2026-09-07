import express from 'express'
import userRouter from './userRoute.js'
import adminRoute from './adminRoute.js'
const router = express.Router()

router.use('/user',userRouter)

router.use('/admin',adminRoute)
export default router