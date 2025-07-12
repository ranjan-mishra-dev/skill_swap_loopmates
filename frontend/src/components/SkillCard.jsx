import React from "react";

const SkillCard = ({ user }) => {
  return (
    <div className="bg-[#F9FAFB] text-[#1F2937] p-6 rounded-3xl shadow-lg mb-6 flex flex-col md:flex-row justify-between items-center gap-6 transition-transform hover:scale-[1.01] duration-300 border border-[#E5E7EB]">
      
      {/* Profile + Info */}
      <div className="flex items-center gap-6 w-full md:w-2/3">
        <img
          src={user.profilePhoto}
          alt="Profile"
          className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-[#4F46E5] shadow-md"
        />
        <div>
          <h2 className="text-2xl font-bold text-[#4F46E5] mb-2">{user.name}</h2>
          
          {/* Skills Offered */}
          <div className="mb-2">
            <p className="text-[#4F46E5] font-semibold mb-1">Skills Offered:</p>
            <div className="flex flex-wrap gap-2">
              {user.skillsOffered.map((skill, index) => (
                <span
                  key={index}
                  className="bg-[#E0E7FF] text-[#1F2937] px-3 py-1 rounded-full text-sm font-medium border border-[#4F46E5]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Skills Wanted */}
          <div>
            <p className="text-[#FB923C] font-semibold mb-1">Skills Wanted:</p>
            <div className="flex flex-wrap gap-2">
              {user.skillsWanted.map((skill, index) => (
                <span
                  key={index}
                  className="bg-[#FFEAD6] text-[#1F2937] px-3 py-1 rounded-full text-sm font-medium border border-[#FB923C]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA + Rating */}
      <div className="text-center md:text-right w-full md:w-1/3">
        <button className="bg-[#FB923C] hover:bg-orange-500 text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-md transition duration-300 mb-3">
          🤝 Request Swap
        </button>
        <div className="text-sm">
          <p className="mb-1 text-[#4B5563]">⭐ Rating</p>
          <p className="text-lg font-bold text-[#1F2937]">{user.rating} / 5</p>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
