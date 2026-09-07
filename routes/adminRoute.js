import express from 'express'
import { adminSignup } from '../controllers/adminController.js'
const router = express.Router()


router.post('/signup',adminSignup)
export default router