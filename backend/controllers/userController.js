import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import { useTransition } from "react";


const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      gender,
      password,
      location,
      skillsOffered,
      skillsWanted,
      availability,
      isProfilePublic,
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      name,
      email,
      gender,
      password: hashedPassword,
      location,
      skillsOffered: skillsOffered || [],
      skillsWanted: skillsWanted || [],
      availability,
      isProfilePublic,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    res.json({ success: true, token, message: 'User registered successfully',});


  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, msg: "user does not exist" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        return res.json({ success: true, token });
      } else {
        return res.json({ success: false, msg: "invalid password" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, msg: error.message });
  }
};


// const userModel = require("../models/User"); // Adjust path if needed
// const cloudinary = require("cloudinary").v2;
// const bcrypt = require("bcrypt");

// const bcrypt = require("bcrypt");
// const cloudinary = require("cloudinary").v2;
// const User = require("../models/User"); // Adjust path as needed

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId; // set by auth middleware

    const {
      name,
      email,
      password,
      location,
      skillsOffered,
      skillsWanted,
      availability,
      isProfilePublic,
      gender,
    } = req.body;

    const imageFile = req.file;
    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (location) updateData.location = location;
    if (skillsOffered) updateData.skillsOffered = skillsOffered;
    if (skillsWanted) updateData.skillsWanted = skillsWanted;
    if (availability) updateData.availability = availability;
    if (gender) updateData.gender = gender;
    if (typeof isProfilePublic !== "undefined") {
      updateData.isProfilePublic = isProfilePublic === "true" || isProfilePublic === true;
    }

    // Handle password securely
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    // Optional profile image upload
    if (req.file) {
  console.log("Uploading image...");
  const imageUpload = await cloudinary.uploader.upload(req.file.path, {
    folder: 'profile_pictures',
  });
  updateData.profileImage = imageUpload.secure_url;
}


    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    return res.json({
      success: true,
      msg: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("Error in updateUserProfile:", error);
    return res.status(500).json({ success: false, msg: error.message });
  }
};


export { registerUser, userLogin, updateUserProfile};