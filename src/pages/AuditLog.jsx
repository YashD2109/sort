import React, { useState } from 'react';

const AuditLog = () => {
  const [auditEmail, setAuditEmail] = useState('');
  const [auditUserId, setAuditUserId] = useState('');
  const [showAuditLogs, setShowAuditLogs] = useState(false);

  const handleTrackUser = (e) => {
    e.preventDefault();
    setShowAuditLogs(true);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Audit Logs</h2>
      <form onSubmit={handleTrackUser} className="bg-white p-6 rounded-lg shadow space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email ID</label>
          <input
            type="email"
            value={auditEmail}
            onChange={(e) => setAuditEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">User ID</label>
          <input
            type="text"
            value={auditUserId}
            onChange={(e) => setAuditUserId(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[#3A506B] text-white px-4 py-2 rounded hover:bg-opacity-90"
        >
          Track User
        </button>
      </form>

      {showAuditLogs && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">User Activity Logs</h3>
          <div className="space-y-2">
            <p>Last login: 2024-03-15 10:30 AM</p>
            <p>Password changed: 2024-03-10 02:15 PM</p>
            <p>Profile updated: 2024-03-05 11:45 AM</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditLog;
