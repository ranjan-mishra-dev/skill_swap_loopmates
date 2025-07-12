import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    // profilePhoto: "",
    skillsOffered: "",
    skillsWanted: "",
    availability: "",
    isProfilePublic: true,
    gender: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      skillsOffered: form.skillsOffered.split(",").map((s) => s.trim()),
      skillsWanted: form.skillsWanted.split(",").map((s) => s.trim()),
    };

    try {
      const {data} = await axios.post(backendUrl + "/api/users/register", payload);
      setMessage("User saved successfully!");
      if (data.success) {
        //keep in mind when u want data token me h aur wahi key bhi ho then instead token:token u can say token
        localStorage.setItem("token", data.token);
        setToken(data.token);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to save user.");
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
      <h2 className="text-2xl mb-4">Create User</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {/* <input type="url" name="profilePhoto" placeholder="Profile Photo URL" value={form.profilePhoto} onChange={handleChange} className="w-full p-2 border rounded" /> */}
        <input
          type="text"
          name="skillsOffered"
          placeholder="Skills Offered (comma separated)"
          value={form.skillsOffered}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="skillsWanted"
          placeholder="Skills Wanted (comma separated)"
          value={form.skillsWanted}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="availability"
          placeholder="e.g., Weekends, Weekdays after 6PM"
          value={form.availability}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isProfilePublic"
            checked={form.isProfilePublic}
            onChange={handleChange}
          />
          Public Profile
        </label>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default UserForm;
