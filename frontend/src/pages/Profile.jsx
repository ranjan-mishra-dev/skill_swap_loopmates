import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const userId = "USER123"; // Replace with actual user ID
  const [editMode, setEditMode] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [statusMsg, setStatusMsg] = useState({ text: "", type: "" });

  const [form, setForm] = useState({
    name: "",
    location: "",
    skillsOffered: [],
    skillsWanted: [],
    availability: "",
    visibility: "Public",
    imageUrl: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/profile/${userId}`);
        const data = await res.json();

        if (data && data.success) {
          setForm(data.profile);
          if (data.profile.imageUrl) {
            setProfilePreview(data.profile.imageUrl);
            setProfileImg(data.profile.imageUrl);
          }
        } else {
          setStatusMsg({ text: "❌ Failed to load profile", type: "error" });
        }
      } catch (err) {
        console.error(err);
        setStatusMsg({ text: "❌ Error loading profile", type: "error" });
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:5000/api/upload/profile-photo", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.imageUrl) {
        setProfilePreview(data.imageUrl);
        setProfileImg(data.imageUrl);
        setStatusMsg({ text: "✅ Image uploaded successfully!", type: "success" });
      } else {
        setStatusMsg({ text: "❌ Image upload failed. Try again.", type: "error" });
      }
    } catch (err) {
      console.error(err);
      setStatusMsg({ text: "⚠️ Something went wrong during image upload.", type: "error" });
    }
  };

  const handleRemoveSkill = (type, index) => {
    const updated = [...form[type]];
    updated.splice(index, 1);
    handleChange(type, updated);
  };

  const handleAddSkill = (type, value) => {
    if (value && !form[type].includes(value)) {
      handleChange(type, [...form[type], value]);
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/profile/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, imageUrl: profileImg }),
      });

      const data = await res.json();

      if (data.success) {
        setEditMode(false);
        setStatusMsg({ text: "✅ Profile saved successfully!", type: "success" });
      } else {
        setStatusMsg({ text: "❌ Failed to save profile", type: "error" });
      }
    } catch (err) {
      console.error(err);
      setStatusMsg({ text: "❌ Error saving profile", type: "error" });
    }
  };

  const handleDiscard = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] px-4 py-6">
      {/* Top Navbar */}
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

          <Link to="/swap-requests" className="text-sm text-[#4F46E5] hover:underline font-medium">
            Swap Requests
          </Link>
          <Link to="/home" className="text-sm text-[#4F46E5] hover:underline font-medium">
            Home
          </Link>

          <div className="w-10 h-10 rounded-full border-2 border-[#FB923C] overflow-hidden">
            <img
              src={profilePreview || "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Status Message */}
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

      {/* Profile Content */}
      <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-8">
        {/* LEFT SIDE */}
        <div className="md:w-2/3 space-y-6">
          {!editMode ? (
            <>
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
          ) : (
            <>
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
                <label className="font-semibold text-[#1F2937]">Profile</label>
                <select
                  className="w-full border rounded p-2 mt-1"
                  value={form.visibility}
                  onChange={(e) => handleChange("visibility", e.target.value)}
                >
                  <option>Public</option>
                  <option>Private</option>
                </select>
              </div>
            </>
          )}
        </div>

        {/* RIGHT SIDE - Big Profile Image */}
        <div className="md:w-1/3 flex flex-col items-center">
          <div className="w-40 h-40 rounded-full border-4 border-[#4F46E5] overflow-hidden shadow-md">
            <img
              src={profilePreview || "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {!editMode ? (
            <div className="mt-4 text-center">
              <h2 className="text-xl font-bold text-[#1F2937]">{form.name}</h2>
              <p className="text-gray-600 text-sm">📍 {form.location}</p>
            </div>
          ) : (
            <div className="mt-3 text-center space-y-2">
              <label className="inline-block bg-[#4F46E5] text-white px-3 py-1 rounded-md text-sm cursor-pointer hover:bg-[#4338CA] transition">
                Add / Edit Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              <button
                onClick={() => {
                  setProfileImg(null);
                  setProfilePreview(null);
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
