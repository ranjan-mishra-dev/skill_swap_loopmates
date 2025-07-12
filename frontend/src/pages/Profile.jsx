import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const Profile = () => {
  const { backendUrl, token, setUserData } = useContext(AppContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    location: "",
    skillsOffered: [],
    skillsWanted: [],
    availability: "",
    visibility: "Public",
    imageUrl: "",
  });

  const [originalForm, setOriginalForm] = useState(form);
  const [editMode, setEditMode] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(true);
  const [profileImg, setProfileImg] = useState(null);
  const [profilePreview, setProfilePreview] = useState("");

  // Fetch Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/users/getProfileData`, {
          headers: { token },
        });
        const data = res.data;
        if (data && data.success) {
          const profile = data.user;
          const userForm = {
            name: profile.name || "",
            location: profile.location || "",
            skillsOffered: profile.skillsOffered || [],
            skillsWanted: profile.skillsWanted || [],
            availability: profile.availability || "",
            visibility: profile.isProfilePublic ? "Public" : "Private",
            imageUrl: profile.profilePhoto || "",
          };
          setForm(userForm);
          setOriginalForm(userForm);
          if (profile.profilePhoto) {
            setProfilePreview(profile.profilePhoto);
            setProfileImg(profile.profilePhoto);
          }
        } else {
          setStatusMsg({ text: "❌ Failed to load profile", type: "error" });
        }
      } catch (err) {
        console.error(err);
        setStatusMsg({ text: "❌ Error loading profile", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchProfile();
  }, [backendUrl, token]);

  // Handlers
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddSkill = (type, value) => {
    if (!value.trim()) return;
    setForm((prev) => ({
      ...prev,
      [type]: [...prev[type], value.trim()],
    }));
  };

  const handleRemoveSkill = (type, index) => {
    setForm((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const handleDiscard = () => {
    setForm(originalForm);
    setProfilePreview(originalForm.imageUrl);
    setEditMode(false);
    setStatusMsg({ text: "❎ Changes discarded", type: "error" });
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        isProfilePublic: form.visibility === "Public",
        profilePhoto: profileImg,
      };

      const res = await axios.post(`${backendUrl}/api/users/update-profile`, payload, {
        headers: { token },
      });

      if (res.data.success) {
        setOriginalForm(form);
        setEditMode(false);
        setStatusMsg({ text: "✅ Profile updated successfully", type: "success" });
      } else {
        setStatusMsg({ text: "❌ Failed to update profile", type: "error" });
      }
    } catch (err) {
      console.error(err);
      setStatusMsg({ text: "❌ Error saving profile", type: "error" });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset"); // Replace with your Cloudinary upload preset

    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", formData);
      const imageUrl = res.data.secure_url;
      setProfileImg(imageUrl);
      setProfilePreview(imageUrl);
      setForm((prev) => ({ ...prev, imageUrl }));
    } catch (err) {
      console.error("Image upload failed", err);
      setStatusMsg({ text: "❌ Failed to upload image", type: "error" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg text-gray-600">
        Loading profile...
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-[#F3F4F6] px-4 py-6">
    <div className="bg-white shadow-sm rounded-lg px-6 py-3 mb-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-[#1F2937]">User Profile</h1>

      <div className="flex items-center gap-4">
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="bg-[#4F46E5] text-white px-4 py-1 rounded-md hover:bg-[#4338CA] text-sm"
          >
            Edit
          </button>
        ) : (
          <>
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={handleDiscard}
              className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700"
            >
              Discard
            </button>
          </>
        )}
        <Link to="/swap-requests" className="text-sm text-[#4F46E5] hover:underline font-medium">Swap Requests</Link>
        <Link to="/home" className="text-sm text-[#4F46E5] hover:underline font-medium">Home</Link>
        <div className="w-10 h-10 rounded-full border-2 border-[#FB923C] overflow-hidden">
          <img
            src={profilePreview || "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>

    {statusMsg.text && (
      <div
        className={`mb-4 px-4 py-2 rounded text-sm w-full md:w-auto ${
          statusMsg.type === "success"
            ? "bg-green-100 text-green-700 border border-green-300"
            : "bg-red-100 text-red-700 border border-red-300"
        }`}
      >
        {statusMsg.text}
      </div>
    )}

    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-8">
      <div className="md:w-2/3 space-y-6">
        {editMode ? (
          <>
            {/* Editable Fields */}
            {["name", "location", "availability"].map((field) => (
              <div key={field}>
                <label className="font-semibold text-[#1F2937] capitalize">{field}</label>
                <input
                  className="w-full border rounded p-2 mt-1"
                  value={form[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                />
              </div>
            ))}

            {["skillsOffered", "skillsWanted"].map((type) => (
              <div key={type}>
                <label className="font-semibold text-[#1F2937]">
                  {type === "skillsOffered" ? "Skills Offered" : "Skills Wanted"}
                </label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {form[type].map((skill, i) => (
                    <span key={i} className="bg-gray-200 px-3 py-1 rounded-full text-sm flex items-center">
                      {skill}
                      <button
                        onClick={() => handleRemoveSkill(type, i)}
                        className="ml-2 text-red-500 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    className="p-1 text-sm border rounded"
                    placeholder="Add skill"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddSkill(type, e.target.value);
                        e.target.value = "";
                      }
                    }}
                  />
                </div>
              </div>
            ))}

            <div>
              <label className="font-semibold text-[#1F2937]">Profile Visibility</label>
              <select
                className="w-full border rounded p-2 mt-1"
                value={form.visibility}
                onChange={(e) => handleChange("visibility", e.target.value)}
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>
          </>
        ) : (
          <>
            {/* Static View */}
            <div>
              <h2 className="text-3xl font-bold text-[#1F2937]">{form.name}</h2>
              <p className="text-gray-600 text-sm mt-1">📍 {form.location}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#1F2937] mb-1">🧰 Skills Offered</h3>
              <div className="flex flex-wrap gap-2">
                {form.skillsOffered.map((skill, i) => (
                  <span key={i} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#1F2937] mb-1">🎯 Skills Wanted</h3>
              <div className="flex flex-wrap gap-2">
                {form.skillsWanted.map((skill, i) => (
                  <span key={i} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <div>
                <h4 className="text-sm font-semibold text-[#1F2937]">🕒 Availability</h4>
                <p className="mt-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm inline-block">
                  {form.availability}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#1F2937]">🔒 Profile</h4>
                <p className="mt-1 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm inline-block">
                  {form.visibility}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Image */}
      <div className="md:w-1/3 flex flex-col items-center">
        <div className="w-40 h-40 rounded-full border-4 border-[#4F46E5] overflow-hidden shadow-md">
          <img
            src={profilePreview || "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        {editMode && (
          <div className="mt-3 text-center space-y-2">
            <label className="inline-block bg-[#4F46E5] text-white px-3 py-1 rounded-md text-sm cursor-pointer hover:bg-[#4338CA] transition">
              Add / Edit Image
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
            <button
              onClick={() => {
                setProfileImg(null);
                setProfilePreview(null);
                setForm((prev) => ({ ...prev, imageUrl: "" }));
              }}
              className="block text-sm text-red-600 hover:text-red-800 underline mx-auto"
            >
              Remove Image
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
);

};

export default Profile;
