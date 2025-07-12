import express from 'express'
import {registerUser, userLogin, updateUserProfile, getUserProfile, getAllUsers } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
const userRouter = express.Router()
import upload from '../middlewares/multer.js'

userRouter.post('/register', registerUser)
userRouter.post('/login', userLogin)
userRouter.get('/getProfileData', authUser, getUserProfile)
userRouter.post('/update-profile',upload.single('profilePhoto') ,authUser, updateUserProfile)
userRouter.get('/get-all',authUser, getAllUsers)


export default userRouter