import express from 'express'
import userRouter from './userRoute.js'
import adminRoute from './adminRoute.js'
import productRoute from './productRoute.js'
const router = express.Router()

router.use('/user',userRouter)

router.use('/admin',adminRoute)

router.use('/product',productRoute)


export default router