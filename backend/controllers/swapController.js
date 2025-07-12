import SwapRequest from "../models/SwapRequest.js";
import User from "../models/userModel.js";
// import {authUser} from "../middlewares/authUser.js";
import express from "express";
import bcrypt from "bcrypt";
// import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import { useTransition } from "react";

// SEND REQUEST
 const sendSwapRequest = async (req, res) => {
  const senderId = req.userId;
  const { recipientId, message } = req.body;

  if (senderId === recipientId)
    return res.status(400).json({ success: false, msg: "Cannot send request to yourself" });

  const existing = await SwapRequest.findOne({ sender: senderId, recipient: recipientId, status: "Pending" });
  if (existing) return res.status(409).json({ success: false, msg: "Request already sent" });

  const request = await SwapRequest.create({ sender: senderId, recipient: recipientId, message });
  res.status(201).json({ success: true, request });
};

// GET SENT REQUESTS (grouped by status)
 const getSentRequests = async (req, res) => {
  const userId = req.userId;
  const requests = await SwapRequest.find({ sender: userId }).populate("recipient", "name email profilePhoto");
  res.json({ success: true, requests });
};

// GET RECEIVED REQUESTS (grouped by status)
 const getReceivedRequests = async (req, res) => {
  const userId = req.userId;
  const requests = await SwapRequest.find({ recipient: userId }).populate("sender", "name email profilePhoto");
  res.json({ success: true, requests });
};

// ACCEPT REQUEST
 const acceptRequest = async (req, res) => {
  const requestId = req.params.id;
  const userId = req.userId;

  const request = await SwapRequest.findById(requestId);
  if (!request || request.recipient.toString() !== userId)
    return res.status(403).json({ success: false, msg: "Not authorized" });

  request.status = "Accepted";
  await request.save();

  res.json({ success: true, msg: "Request accepted" });
};

// REJECT REQUEST
 const rejectRequest = async (req, res) => {
  const requestId = req.params.id;
  const userId = req.userId;

  const request = await SwapRequest.findById(requestId);
  if (!request || request.recipient.toString() !== userId)
    return res.status(403).json({ success: false, msg: "Not authorized" });

  request.status = "Rejected";
  await request.save();

  res.json({ success: true, msg: "Request rejected" });
};

// DELETE REQUEST (only sender can delete if still pending)
 const deleteSwapRequest = async (req, res) => {
  const requestId = req.params.id;
  const userId = req.userId;

  const request = await SwapRequest.findById(requestId);
  if (!request || request.sender.toString() !== userId)
    return res.status(403).json({ success: false, msg: "Not authorized" });

  if (request.status !== "Pending")
    return res.status(400).json({ success: false, msg: "Only pending requests can be deleted" });

  await request.deleteOne();
  res.json({ success: true, msg: "Request deleted" });
};

export { deleteSwapRequest, rejectRequest, acceptRequest, getReceivedRequests, getSentRequests, sendSwapRequest};