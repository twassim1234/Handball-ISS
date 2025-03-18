import React, { useState } from "react";
import axios from "axios";

const ManageAdmins = () => {
  const [admins, setAdmins] = useState([
    { id: 1, username: "superadmin", type: "Federation Admin" },
  ]);

  const [showManageAccounts, setShowManageAccounts] = useState(false);

  const [newAdmin, setNewAdmin] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role_name: "Club Admin",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Mapping displayed role names to ENUM values
  const roleMapping = {
    "Federation Admin": "federation_admin",
    "Club Admin": "club_admin",
    "DNA Admin": "DNA_Admin",
    "Referee": "referee",
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!newAdmin.first_name || !newAdmin.last_name || !newAdmin.email || !newAdmin.password) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    // Convert role_name to ENUM value before sending request
    const formattedAdmin = {
      ...newAdmin,
      role_name: roleMapping[newAdmin.role_name], // Ensures correct ENUM value is sent
    };

    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      setError("User not authenticated. Please log in.");
      return;
    }
    
    try {
      const response = await axios.post(
        "http://localhost:8000/register",
        formattedAdmin,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Register API Response:", response.data); // Debugging
      console.log("Token being sent:", token);


      setAdmins([...admins, { id: response.data.admin_id, ...newAdmin }]);
      setSuccess("Admin added successfully!");
      setNewAdmin({ first_name: "", last_name: "", email: "", password: "", role_name: "Club Admin" });
    } catch (err) {
      setError(err.response?.data?.error || "Error adding admin");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveAdmin = async (admin_id, role_name) => {
    if (role_name === "Federation Admin") {
      setError("Cannot delete a Federation Admin.");
      return;
    }
  
    const confirmDelete = window.confirm("Are you sure you want to delete this admin?");
    if (!confirmDelete) return;
  
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      setError("User not authenticated. Please log in.");
      return;
    }
  
    try {
      const response = await axios.delete(`http://localhost:8000/admin/${admin_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.status === 200) {
        setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== admin_id));
        setSuccess("Admin deleted successfully.");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error deleting admin.");
    }
  };
  

  return (
    <div>
      <button
        onClick={() => setShowManageAccounts(!showManageAccounts)}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-800 mb-6"
      >
        {showManageAccounts ? "Hide Account Management" : "Manage Accounts"}
      </button>

      {showManageAccounts && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold">Manage Admins</h2>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <form onSubmit={handleAddAdmin} className="mt-4 flex flex-col gap-3">
            <input
              type="text"
              placeholder="First Name"
              value={newAdmin.first_name}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, first_name: e.target.value })
              }
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={newAdmin.last_name}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, last_name: e.target.value })
              }
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newAdmin.email}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, email: e.target.value })
              }
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={newAdmin.password}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, password: e.target.value })
              }
              className="border p-2 rounded w-full"
              required
            />
            <select
              value={newAdmin.role_name}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, role_name: e.target.value })
              }
              className="border p-2 rounded w-full"
            >
              {Object.keys(roleMapping).map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-red-500 text-white p-2 rounded hover:bg-red-800"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Admin"}
            </button>
          </form>

          <h3 className="mt-6 font-bold">Current Admins</h3>
          <ul className="mt-3">
            {admins.map((admin) => (
              <li
                key={admin.id}
                className="p-2 border-b flex justify-between items-center"
              >
                <span>
                  {admin.first_name} {admin.last_name} - <strong>{admin.role_name}</strong>
                </span>
                {admin.role_name !== "Federation Admin" && (
                  <button
                    onClick={() => handleRemoveAdmin(admin.id, admin.role_name)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-800"
                  >
                    Remove
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ManageAdmins;
