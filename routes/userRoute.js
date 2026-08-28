import express from 'express'
import { Login, profileUpdate, Signup } from "../controllers/userController.js"

const router = express.Router()


router.post('/signup',Signup)

router.post('/login',Login)

router.put('/update',profileUpdate)


export default router