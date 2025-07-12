import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 7;

const Request = () => {
  const [tab, setTab] = useState("received");

  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);

  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [sentFilter, setSentFilter] = useState("all");
  const [sentSearch, setSentSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resReceived, resSent] = await Promise.all([
        fetch("http://localhost:5000/api/requests/received"),
        fetch("http://localhost:5000/api/requests/sent"),
      ]);
      const dataReceived = await resReceived.json();
      const dataSent = await resSent.json();

      setReceivedRequests(dataReceived || []);
      setSentRequests(dataSent || []);
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [tab, filter, searchQuery, sentFilter, sentSearch]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await fetch(`http://localhost:5000/api/requests/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      setReceivedRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: newStatus } : r))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/requests/${id}`, {
        method: "DELETE",
      });
      setSentRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Error deleting request:", err);
    }
  };

  const filteredReceived = receivedRequests
    .filter((r) => filter === "all" || r.status === filter)
    .filter((r) => {
      const q = searchQuery.toLowerCase();
      return (
        r.name.toLowerCase().includes(q) ||
        r.offeredSkill.toLowerCase().includes(q) ||
        r.wantedSkill.toLowerCase().includes(q)
      );
    });

  const filteredSent = sentRequests
    .filter((r) => sentFilter === "all" || r.status === sentFilter)
    .filter((r) => {
      const q = sentSearch.toLowerCase();
      return (
        r.name.toLowerCase().includes(q) ||
        r.offeredSkill.toLowerCase().includes(q) ||
        r.wantedSkill.toLowerCase().includes(q)
      );
    });

  const totalPages = Math.ceil(
    (tab === "received" ? filteredReceived.length : filteredSent.length) /
      ITEMS_PER_PAGE
  );

  const currentItems =
    tab === "received"
      ? filteredReceived.slice(
          (currentPage - 1) * ITEMS_PER_PAGE,
          currentPage * ITEMS_PER_PAGE
        )
      : filteredSent.slice(
          (currentPage - 1) * ITEMS_PER_PAGE,
          currentPage * ITEMS_PER_PAGE
        );

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Navbar */}
      <div className="bg-white px-6 py-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#1F2937]">Swap Requests</h1>
        <div className="flex items-center gap-4">
          <Link
            to="/home"
            className="text-sm bg-[#4F46E5] text-white px-4 py-1 rounded-md hover:bg-[#4338CA]"
          >
            Home
          </Link>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
            alt="User"
            className="w-10 h-10 rounded-full border-2 border-orange-400 object-cover"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mt-6">
        {["received", "sent"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-md ${
              tab === t
                ? "bg-[#4F46E5] text-white"
                : "bg-white border border-[#4F46E5] text-[#4F46E5]"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center px-6 py-4 gap-4">
        <select
          value={tab === "received" ? filter : sentFilter}
          onChange={(e) =>
            tab === "received"
              ? setFilter(e.target.value)
              : setSentFilter(e.target.value)
          }
          className="border px-3 py-1 rounded-md text-sm w-full md:w-40"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>

        <input
          type="text"
          placeholder="Search name or skills..."
          value={tab === "received" ? searchQuery : sentSearch}
          onChange={(e) =>
            tab === "received"
              ? setSearchQuery(e.target.value)
              : setSentSearch(e.target.value)
          }
          className="border px-3 py-1 rounded-md text-sm w-full md:w-72"
        />
      </div>

      {/* Request Cards */}
      <div className="px-6 py-4 space-y-6">
        {currentItems.length > 0 ? (
          currentItems.map((req) => (
            <div
              key={req._id}
              className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <img
                  src={req.profilePic}
                  alt="Profile"
                  className="w-20 h-20 rounded-full border-2 border-[#4F46E5] object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold">{req.name}</h2>
                  <p className="text-sm text-gray-600 mt-1">⭐ {req.rating}/5</p>
                  <p className="text-sm mt-2 text-green-700">
                    Offered:{" "}
                    <span className="bg-green-100 px-2 py-0.5 rounded-full">
                      {req.offeredSkill}
                    </span>
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    Wanted:{" "}
                    <span className="bg-blue-100 px-2 py-0.5 rounded-full">
                      {req.wantedSkill}
                    </span>
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="text-center mt-4 md:mt-0">
                <p className="text-sm mb-2 font-medium">
                  Status:{" "}
                  <span
                    className={`${
                      req.status === "pending"
                        ? "text-gray-500"
                        : req.status === "accepted"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {req.status}
                  </span>
                </p>
                {tab === "received" && req.status === "pending" && (
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleStatusChange(req._id, "accepted")}
                      className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusChange(req._id, "rejected")}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                )}
                {tab === "sent" && req.status === "pending" && (
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10">No requests found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-2 text-[#4F46E5] font-semibold flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded ${
              currentPage === page
                ? "bg-[#4F46E5] text-white"
                : "bg-white border border-[#4F46E5]"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Request;
