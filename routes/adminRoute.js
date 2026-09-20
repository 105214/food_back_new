import express from 'express'
import { adminLogin, adminSignup, adminUpdate, profileDelete } from '../controllers/adminController.js'
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAuth.js'
const router = express.Router()


router.post('/signup',upload.single('image'), adminSignup)

router.post('/login',adminLogin)

router.put('/update/:id',upload.single('image'),adminAuth, adminUpdate)

router.delete('/delete/:id',adminAuth,profileDelete)
export default router