import React, { useState } from 'react';
import SkillCard from './components/SkillCard';
import users from './users.json';
import { Link } from 'react-router-dom';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // ✅ Filter users first
  const filteredUsers = users.filter((user) => {
    const nameMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const availabilityMatch =
      availabilityFilter === '' || user.availability.toLowerCase() === availabilityFilter.toLowerCase();
    return nameMatch && availabilityMatch;
  });

  // ✅ Then calculate pagination based on filtered users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="p-6 bg-[#F9FAFB] min-h-screen">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset page on filter
          }}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
        />

        {/* Availability Dropdown */}
        <select
          value={availabilityFilter}
          onChange={(e) => {
            setAvailabilityFilter(e.target.value);
            setCurrentPage(1); // reset page on filter
          }}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
        >
          <option value="">All Availabilities</option>
          <option value="weekends">Weekends</option>
          <option value="evenings">Evenings</option>
          <option value="weekdays">Weekdays</option>
        </select>
      </div>

      {/* Render filtered users */}
      {filteredUsers.length > 0 ? (
        <>
          {currentUsers.map((user, index) => (
            <Link
              to={`/user/${indexOfFirstUser + index}`}
              state={user}
              key={user.id}
              className="block"
            >
              <SkillCard user={user} />
            </Link>
          ))}

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === i + 1
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 mt-10">No matching users found.</p>
      )}
    </div>
  );
};

export default Home;
