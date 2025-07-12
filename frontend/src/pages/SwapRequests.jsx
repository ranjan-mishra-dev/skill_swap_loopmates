import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const SwapRequests = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = { Authorization: `Bearer ${token}` };

  const fetchRequests = async () => {
    try {
      const [sent, received] = await Promise.all([
        axios.get(`${backendUrl}/api/swaps/sent`, { headers }),
        axios.get(`${backendUrl}/api/swaps/received`, { headers }),
      ]);
      setSentRequests(sent.data.requests);
      setReceivedRequests(received.data.requests);
    } catch (err) {
      toast.error("Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchRequests();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/swaps/delete/${id}`, { headers });
      toast.success("Request deleted");
      fetchRequests();
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to delete");
    }
  };

  const handleAction = async (id, action) => {
    try {
      await axios.put(`${backendUrl}/api/swaps/${action}/${id}`, {}, { headers });
      toast.success(`Request ${action}ed`);
      fetchRequests();
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to update");
    }
  };

  const groupRequests = (arr, key) => {
    return arr.reduce((acc, curr) => {
      const status = curr.status;
      acc[status] = acc[status] || [];
      acc[status].push(curr);
      return acc;
    }, {});
  };

  const sentGrouped = groupRequests(sentRequests);
  const receivedGrouped = groupRequests(receivedRequests);

  if (!token) return <p className="text-center mt-8 text-red-500">Please log in to view your requests.</p>;
  if (loading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Sent Requests</h2>
      {["Pending", "Accepted", "Rejected"].map((status) => (
        <div key={status}>
          <h3 className="text-lg font-semibold">{status}</h3>
          <ul className="space-y-2">
            {sentGrouped[status]?.map((req) => (
              <li key={req._id} className="p-3 bg-gray-100 rounded flex justify-between items-center">
                <div>
                  To: {req.recipient.name} — <span className="text-sm italic">{req.message}</span>
                </div>
                {status === "Pending" && (
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                )}
              </li>
            )) || <p>No {status} requests</p>}
          </ul>
        </div>
      ))}

      <h2 className="text-2xl font-bold mt-10">Received Requests</h2>
      {["Pending", "Accepted", "Rejected"].map((status) => (
        <div key={status}>
          <h3 className="text-lg font-semibold">{status}</h3>
          <ul className="space-y-2">
            {receivedGrouped[status]?.map((req) => (
              <li key={req._id} className="p-3 bg-gray-100 rounded flex justify-between items-center">
                <div>
                  From: {req.sender.name} — <span className="text-sm italic">{req.message}</span>
                </div>
                {status === "Pending" && (
                  <div className="space-x-2">
                    <button
                      onClick={() => handleAction(req._id, "accept")}
                      className="text-green-600 hover:underline"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleAction(req._id, "reject")}
                      className="text-red-600 hover:underline"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </li>
            )) || <p>No {status} requests</p>}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SwapRequests;
