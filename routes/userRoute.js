import express from 'express'
import { Login, profileUpdate, Signup } from "../controllers/userController.js"
import UserAuth from '../middleware/userAuth.js'

const router = express.Router()


router.post('/signup',Signup)

router.post('/login',Login)

router.put('/update/:id',UserAuth,profileUpdate)


export default router