import React, { useState } from "react";
import ManageAdmins from "../ManageAdmins";
import Requests from "../Requests";
import AuthenticationLayout from "../../Layouts/AuthenticationLayout";

export default function AdminPage() {
  return (
    <AuthenticationLayout requiresAuth allowedRoles={[1]}>
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="flex justify-center text-4xl font-bold text-gray-900 mb-24 mt-12">Admin Dashboard</h1>
      <Requests />
      <ManageAdmins />
    </div>
    </AuthenticationLayout>
  );
}
