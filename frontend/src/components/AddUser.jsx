import React, { useState } from "react";

const AddUser = ({ users, setUsers }) => {
  const [form, setForm] = useState({
    name: "",
    skillsOffered: "",
    skillsWanted: "",
    rating: "",
    availability: "",
    profilePhoto: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
  });

  const handleAdd = () => {
    if (!form.name || !form.skillsOffered || !form.skillsWanted) return;

    const newUser = {
      id: users.length + 1,
      name: form.name,
      skillsOffered: form.skillsOffered.split(",").map((s) => s.trim()),
      skillsWanted: form.skillsWanted.split(",").map((s) => s.trim()),
      rating: parseFloat(form.rating || 4.0),
      availability: form.availability || "weekdays",
      profilePhoto: form.profilePhoto,
    };

    setUsers([...users, newUser]);
    setForm({
      name: "",
      skillsOffered: "",
      skillsWanted: "",
      rating: "",
      availability: "",
      profilePhoto: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
    });
  };

  return (
    <div className="p-4 border rounded-lg shadow-md max-w-2xl mx-auto space-y-3">
      <h2 className="text-xl font-bold text-indigo-700">➕ Add New User</h2>
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Skills Offered (comma separated)"
        value={form.skillsOffered}
        onChange={(e) => setForm({ ...form, skillsOffered: e.target.value })}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Skills Wanted (comma separated)"
        value={form.skillsWanted}
        onChange={(e) => setForm({ ...form, skillsWanted: e.target.value })}
        className="w-full border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Rating (optional)"
        value={form.rating}
        onChange={(e) => setForm({ ...form, rating: e.target.value })}
        className="w-full border p-2 rounded"
      />
      <select
        value={form.availability}
        onChange={(e) => setForm({ ...form, availability: e.target.value })}
        className="w-full border p-2 rounded"
      >
        <option value="weekdays">Weekdays</option>
        <option value="weekends">Weekends</option>
        <option value="evenings">Evenings</option>
      </select>
      <button
        onClick={handleAdd}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add User
      </button>
    </div>
  );
};

export default AddUser;
