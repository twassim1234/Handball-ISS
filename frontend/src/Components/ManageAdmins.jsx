import React, { useState } from "react";

const ManageAdmins = () => {
  const [admins, setAdmins] = useState([
    { id: 1, username: "superadmin", type: "Super Admin" },
  ]);

  const [showManageAccounts, setShowManageAccounts] = useState(false);

  const [newAdmin, setNewAdmin] = useState({
    username: "",
    password: "",
    type: "Moderator",
  });

  const handleAddAdmin = (e) => {
    e.preventDefault();
    if (!newAdmin.username || !newAdmin.password) return;
    setAdmins([...admins, { id: Date.now(), ...newAdmin }]);
    setNewAdmin({ username: "", password: "", type: "Moderator" });
  };

  const handleRemoveAdmin = (id) => {
    setAdmins((prevAdmins) =>
      prevAdmins.filter((admin) => !(admin.id === id && admin.type !== "Super Admin"))
    );
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

          <form onSubmit={handleAddAdmin} className="mt-4 flex flex-col gap-3">
            <input
              type="text"
              placeholder="Username"
              value={newAdmin.username}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, username: e.target.value })
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
              value={newAdmin.type}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, type: e.target.value })
              }
              className="border p-2 rounded w-full"
            >
              <option value="Super Admin">Super Admin</option>
              <option value="Moderator">Team Admin</option>
              <option value="Viewer">DHT</option>
              <option value="Viewer">Arbiter</option>

            </select>
            <button
              type="submit"
              className="bg-red-500 text-white p-2 rounded hover:bg-red-800"
            >
              Add Admin
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
                  {admin.username} - <strong>{admin.type}</strong>
                </span>
                {admin.type !== "Super Admin" && (
                  <button
                    onClick={() => handleRemoveAdmin(admin.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
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
