import express from "express";
// import { authUser } from "../middlewares/authUser.js";
import {
  sendSwapRequest,
  getSentRequests,
  getReceivedRequests,
  acceptRequest,
  rejectRequest,
  deleteSwapRequest,
} from "../controllers/swapController.js";

const router = express.Router();

// import express from 'express'
// import {registerUser, userLogin, updateUserProfile, getUserProfile } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
// const userRouter = express.Router()
import upload from '../middlewares/multer.js'

router.post("/send", authUser, sendSwapRequest);
router.get("/sent", authUser, getSentRequests);
router.get("/received", authUser, getReceivedRequests);
router.put("/accept/:id", authUser, acceptRequest);
router.put("/reject/:id", authUser, rejectRequest);
router.delete("/delete/:id", authUser, deleteSwapRequest);

export default router;
