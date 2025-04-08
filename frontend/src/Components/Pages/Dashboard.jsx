import React, { useState } from "react";
import ManageAdmins from "../ManageAdmins";
import Requests from "../Requests";
import AuthenticationLayout from "../../Layouts/AuthenticationLayout";

export default function AdminPage() {
  const [filter, setFilter] = useState("all");

  return (
    <AuthenticationLayout requiresAuth allowedRoles={[1]}>
      <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="flex justify-center text-4xl font-bold text-gray-900 mb-24 mt-12">
          Qualification Requests
        </h1>
        {/* Filter buttons */}
        <div className="flex gap-2 mb-6 ml-6"  >
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded hover:bg-red-800 transition ${
              filter === "all" ? "bg-red-800" : "bg-red-500"
            } text-white`}
          >
            All 
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded hover:bg-red-800 transition ${
              filter === "pending" ? "bg-red-800" : "bg-red-500"
            } text-white`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter("rejected")}
            className={`px-4 py-2 rounded hover:bg-red-800 transition ${
              filter === "rejected" ? "bg-red-800" : "bg-red-500"
            } text-white`}
          >
            Rejected
          </button>
          <button
            onClick={() => setFilter("accepted")}
            className={`px-4 py-2 rounded hover:bg-red-800 transition ${
              filter === "accepted" ? "bg-red-800" : "bg-red-500"
            } text-white`}
          >
            Approved
          </button>
        </div>

        

        <Requests filter={filter} />
        <ManageAdmins />
      </div>
    </AuthenticationLayout>
  );
}