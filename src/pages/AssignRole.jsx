import React, { useState } from 'react';

const AssignRole = () => {
  const [newAccounts] = useState([
    { email: 'john@example.com', role: 'Patient' },
    { email: 'jane@example.com', role: 'Doctor' },
  ]);

  const handleRoleChange = (email, role) => {
    // Add role change logic here
    console.log(`Changed role for ${email} to ${role}`);
  };

  const handleRejectRequest = (email) => {
    // Add reject request logic here
    console.log(`Rejected request for ${email}`);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Assign Roles</h2>
      <div className="space-y-4">
        {newAccounts.map((account) => (
          <div key={account.email} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
            <span className="flex-1">{account.email}</span>
            <select
              className="rounded border border-gray-300 px-3 py-2"
              value={account.role}
              onChange={(e) => handleRoleChange(account.email, e.target.value)}
            >
              <option value="Admin">Admin</option>
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
            </select>
            <button
              className="bg-[#3A506B] text-white px-4 py-2 rounded hover:bg-opacity-90"
              onClick={() => handleRoleChange(account.email, account.role)}
            >
              Confirm Role
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-opacity-90"
              onClick={() => handleRejectRequest(account.email)}
            >
              Reject
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignRole;
