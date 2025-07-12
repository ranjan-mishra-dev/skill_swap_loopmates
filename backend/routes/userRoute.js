import express from 'express'
import {registerUser, userLogin, updateUserProfile } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
const userRouter = express.Router()
import upload from '../middlewares/multer.js'

userRouter.post('/register', registerUser)
userRouter.post('/login', userLogin)
userRouter.post('/update-profile',upload.single('profilePhoto') ,authUser, updateUserProfile)


export default userRouter