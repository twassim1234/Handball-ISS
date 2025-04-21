import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Sections/Search";

const Requests = ({ filter }) => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [aiResponses, setAiResponses] = useState({});
  const [loadingAiId, setLoadingAiId] = useState(null);


  const handleUseAI = async (id, files) => {
    const paymentFile = files.find((f) => f.name === "Extrait de paiement");
    if (!paymentFile?.url) {
      alert("Payment receipt not found.");
      return;
    }
  
    setLoadingAiId(id);
  
    try {
      // Upload PDF to backend
      const response = await fetch(paymentFile.url);
      const blob = await response.blob();
      const file = new File([blob], "payment.pdf", { type: "application/pdf" });
  
      const formData = new FormData();
      formData.append("file", file);
  
      // Get the plain-text summary from backend
      const { data } = await axios.post(
        "http://localhost:8000/extract-pdf",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
  
      // Display the AI summary directly
      setAiResponses((prev) => ({
        ...prev,
        [id]: (
          <div style={{ whiteSpace: 'pre-line' }}>  {/* This makes \n work */}
            {data}
          </div>
        ),
      }));
    } catch (err) {
      setAiResponses((prev) => ({
        ...prev,
        [id]: "❌ Failed to validate payment. Try again.",
      }));
    } finally {
      setLoadingAiId(null);
    }
  };
  

  // Fetch qualification requests from the backend
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (!token) {
          throw new Error("User not authenticated. Please log in.");
        }

        const response = await axios.get(
          "http://localhost:8000/qualification-requests/retrieve",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Map the API response to the requests state
        const mappedRequests = response.data.qualification_requests.map((request) => ({
          id: request.request_id,
          fullName: request.fullname,
          email: request.email,
          phoneNumber: request.phone_number,
          reference: request.reference, 
          files: [
            { name: "Extrait de naissance", url: `http://localhost:8000/${request.extrait_de_naissance}` },
            { name: "Autorisation parentale", url: `http://localhost:8000/${request.autorisation_parentale}` },
            { name: "CIN Scolaire", url: `http://localhost:8000/${request.cin_scolaire}` },
            { name: "Photo", url: `http://localhost:8000/${request.photo}` },
            { name: "Extrait de paiement", url: `http://localhost:8000/${request.extrait_de_payment}` },
          ],
          submittedAt: new Date(request.request_date).toLocaleDateString(),
          status: request.status === null ? "Pending" : request.status,
        }));

        setRequests(mappedRequests);
        applyFilter(mappedRequests, filter,searchTerm);
      } catch (error) {
        console.error("Error fetching qualification requests:", error);
      }
    };

    fetchRequests();
  }, [filter]);

  // Apply filter when filter prop changes
  useEffect(() => {
    applyFilter(requests, filter,searchTerm);
  }, [filter,searchTerm, requests]);

  const applyFilter = (requestsToFilter, currentFilter, searchTerm) => {
    let filtered = requestsToFilter;
    
    // Apply status filter
    if (currentFilter !== "all") {
      filtered = filtered.filter((request) => 
        request.status.toLowerCase() === currentFilter
      );
    }
    
    // Apply search filter if search term exists
    if (searchTerm) {
      filtered = filtered.filter((request) =>
        request.reference?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredRequests(filtered);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Handle Approve action
  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated. Please log in.");
      }

      // Call the API to update the status to "accepted"
      await axios.put(
        `http://localhost:8000/qualification-request/${id}/status`,
        { status: "accepted" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update the local state
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.id === id ? { ...req, status: "accepted" } : req
        )
      );
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  // Handle Reject action
  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated. Please log in.");
      }

      // Call the API to update the status to "rejected"
      await axios.put(
        `http://localhost:8000/qualification-request/${id}/status`,
        { status: "rejected" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update the local state
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.id === id ? { ...req, status: "rejected" } : req
        )
      );
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-96">
      
      <Search 
  onSearch={handleSearch}
  placeholder="Search by player's reference"  
/>
      <div className="grid gap-6">

        {filteredRequests.map((request) => (
          <div
            key={request.id}
            className="p-4 bg-white rounded-lg shadow-lg border border-gray-200"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                {request.fullName}
              </h2>
              <p
                className={`text-sm font-medium px-2 py-1 rounded ${
                  request.status === "Pending"
                    ? "bg-yellow-200 text-yellow-800"
                    : request.status === "accepted"
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {request.status}
              </p>
            </div>
            <p className="text-sm text-gray-600">
              Submitted at: {request.submittedAt}
            </p>
            <p className="mt-2 text-gray-700">Email: {request.email}</p>
            <p className="mt-1 text-gray-700">Phone: {request.phoneNumber}</p>
            <p className="mt-1 text-gray-700">Ref: {request.reference}</p>
            <h3 className="mt-4 font-bold">Uploaded Files:</h3>
            <ul className="list-disc pl-6 mt-2 text-gray-600">
              {request.files.map((file, index) => (
                <li key={index}>
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {file.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex gap-2">
            {request.status === "Pending" && (
                <>
                  <button
                    onClick={() => handleApprove(request.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(request.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                  </>
              )}
            </div>
            <div className="flex justify-end">
            <button
              onClick={() => handleUseAI(request.id, request.files)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Use AI
            </button>
          </div>
          {loadingAiId === request.id && (
              <p className="text-blue-500 mt-2">Analyzing with AI...</p>
            )}

            {aiResponses[request.id] && (
              <div className="mt-3 p-3 bg-gray-100 border-l-4 border-blue-500 text-gray-800">
                <strong>AI Summary:</strong>
                <p>{aiResponses[request.id]}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;