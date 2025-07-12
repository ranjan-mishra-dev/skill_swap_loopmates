import { useParams } from "react-router-dom";

import users from "../users.json"

const ProfileDetail = () => {
  const { id } = useParams();
  const user = users[id]; 

  if (!user) return <div className="text-white p-4">User not found</div>;

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800 p-6">
  <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6">
    <div className="flex flex-col md:flex-row items-center gap-6">
      <img
        src={user.profilePhoto}
        alt={user.name}
        className="w-32 h-32 rounded-full border-4 border-indigo-600"
      />
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold text-indigo-600">{user.name}</h1>

        <div className="mt-4">
          <p className="font-semibold text-gray-700 mb-1">Skills Offered:</p>
          <div className="flex flex-wrap gap-2">
            {user.skillsOffered.map((skill, i) => (
              <span
                key={i}
                className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <p className="font-semibold text-gray-700 mb-1">Skills Wanted:</p>
          <div className="flex flex-wrap gap-2">
            {user.skillsWanted.map((skill, i) => (
              <span
                key={i}
                className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-6 font-medium text-gray-700">
          ⭐ Rating: <span className="text-indigo-600 font-bold">{user.rating}</span> / 5
        </p>
      </div>
    </div>

    <div className="mt-6 flex justify-center md:justify-end">
      <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition">
        Send Swap Request
      </button>
    </div>
  </div>
</div>

  );
};

export default ProfileDetail;
