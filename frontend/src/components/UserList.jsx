import React, { useState } from "react";

const UserList = ({ users, setUsers }) => {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", skillsOffered: "", skillsWanted: "" });

  const handleEditClick = (user) => {
    setEditingId(user.id);
    setForm({
      name: user.name,
      skillsOffered: user.skillsOffered.join(", "),
      skillsWanted: user.skillsWanted.join(", "),
    });
  };

  const handleSave = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              name: form.name,
              skillsOffered: form.skillsOffered.split(",").map((s) => s.trim()),
              skillsWanted: form.skillsWanted.split(",").map((s) => s.trim()),
            }
          : user
      )
    );
    setEditingId(null);
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      {users.map((user) => (
        <div
          key={user.id}
          className="p-4 border rounded-lg shadow-md flex flex-col md:flex-row justify-between gap-4"
        >
          <div className="flex gap-4 items-start w-full">
            <img
              src={user.profilePhoto}
              alt="avatar"
              className="w-14 h-14 rounded-lg object-cover border-2 border-indigo-100"
            />

            {editingId === user.id ? (
              <div className="w-full space-y-2">
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="border p-2 w-full rounded"
                  placeholder="Name"
                />
                <input
                  type="text"
                  value={form.skillsOffered}
                  onChange={(e) => setForm({ ...form, skillsOffered: e.target.value })}
                  className="border p-2 w-full rounded"
                  placeholder="Skills Offered (comma separated)"
                />
                <input
                  type="text"
                  value={form.skillsWanted}
                  onChange={(e) => setForm({ ...form, skillsWanted: e.target.value })}
                  className="border p-2 w-full rounded"
                  placeholder="Skills Wanted (comma separated)"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave(user.id)}
                    className="bg-indigo-600 text-white px-4 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-400 text-white px-4 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-1 w-full">
                <h3 className="font-bold text-lg">{user.name}</h3>
                <p className="text-sm text-gray-600">
                  Skills Offered: {user.skillsOffered.join(", ")}
                </p>
                <p className="text-sm text-gray-600">
                  Wants: {user.skillsWanted.join(", ")}
                </p>
                <p className="text-sm text-gray-600">Rating: ⭐ {user.rating}</p>
                <p className="text-sm text-gray-600">Available: {user.availability}</p>
              </div>
            )}
          </div>

          {editingId !== user.id && (
            <button
              onClick={() => handleEditClick(user)}
              className="text-indigo-600 underline self-start"
            >
              Edit
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserList;
