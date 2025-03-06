import React, { useState } from "react";

const Requests = () => {
    const [requests, setRequests] = useState([
        {
            id: 1,
            fullName: "John Doe",
            email: "john.doe@example.com",
            phoneNumber: "123456789",
            files: [
              { name: "Extrait de naissance", url: "#" },
              { name: "Autorisation parental", url: "#" },
              { name: "CIN Scholaire", url: "#" },
              { name: "Photo", url: "#" },
              { name: "Extrait de payment", url: "#" },
            ],
            submittedAt: "2025-03-06",
            status: "Pending",
          },{
            id: 2,
            fullName: "John Doe",
            email: "john.doe@example.com",
            phoneNumber: "123456789",
            files: [
              { name: "Extrait de naissance", url: "#" },
              { name: "Autorisation parental", url: "#" },
              { name: "CIN Scholaire", url: "#" },
              { name: "Photo", url: "#" },
              { name: "Extrait de payment", url: "#" },
            ],
            submittedAt: "2025-03-06",
            status: "Pending",
          },
          {
            id: 3,
            fullName: "John Doe",
            email: "john.doe@example.com",
            phoneNumber: "123456789",
            files: [
              { name: "Extrait de naissance", url: "#" },
              { name: "Autorisation parental", url: "#" },
              { name: "CIN Scholaire", url: "#" },
              { name: "Photo", url: "#" },
              { name: "Extrait de payment", url: "#" },
            ],
            submittedAt: "2025-03-06",
            status: "Pending",
          },
      ]);
    
      const handleApprove = (id) => {
        setRequests((prevRequests) =>
          prevRequests.map((req) =>
            req.id === id ? { ...req, status: "Approved" } : req
          )
        );
      };
    
      const handleReject = (id) => {
        setRequests((prevRequests) =>
          prevRequests.map((req) =>
            req.id === id ? { ...req, status: "Rejected" } : req
          )
        );
      };
    
      return (
        <div className="p-6 bg-gray-100 min-h-96">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Qualification Requests</h1>
          <div className="grid gap-6">
            {requests.map((request) => (
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
                        : request.status === "Approved"
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
                  <button
                    onClick={() => handleApprove(request.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(request.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
  );
};

export default Requests;
