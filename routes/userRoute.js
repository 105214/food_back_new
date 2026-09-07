import express from 'express'
import { deleteProfile, Login, logout, profileUpdate, Signup } from "../controllers/userController.js"
import UserAuth from '../middleware/userAuth.js'

const router = express.Router()


router.post('/signup',Signup)

router.post('/login',Login)

router.put('/update/:id',UserAuth,profileUpdate)

router.delete('/delete/:id',deleteProfile)

router.put('/logout',logout)
export default router