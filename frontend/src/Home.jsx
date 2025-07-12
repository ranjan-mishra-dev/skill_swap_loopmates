import React, { useState } from 'react';
import SkillCard from './components/SkillCard';
import users from './users.json';
import { Link } from 'react-router-dom';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');

  // Filter logic
  const filteredUsers = users.filter((user) => {
    const nameMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const availabilityMatch =
      availabilityFilter === '' || user.availability.toLowerCase() === availabilityFilter.toLowerCase();
    return nameMatch && availabilityMatch;
  });

  return (
    <div className="p-6 bg-[#F9FAFB] min-h-screen">

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
        />

        {/* Availability Dropdown */}
        <select
          value={availabilityFilter}
          onChange={(e) => setAvailabilityFilter(e.target.value)}
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
        filteredUsers.map((user, index) => (
          <Link to={`/user/${index}`} state={user} key={user.id} className="block">
            <SkillCard user={user} />
          </Link>
        ))
      ) : (
        <p className="text-center text-gray-500 mt-10">No matching users found.</p>
      )}
    </div>
  );
};

export default Home;
