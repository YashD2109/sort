import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { 
  Inbox as InboxIcon,
  Star,
  Send,
  FileEdit,
  Trash2,
  AlertCircle
} from 'lucide-react';

const mockRequests = [
  {
    id: '1',
    title: 'Cardiology Consultation Request',
    hospital: 'Central Medical Center',
    date: '2024-03-15',
    status: 'Pending',
    isStarred: true,
    isImportant: true
  },
  {
    id: '2',
    title: 'Emergency Care Request',
    hospital: 'City General Hospital',
    date: '2024-03-14',
    status: 'Approved',
    isStarred: false,
    isImportant: true
  }
];

const RequestList = ({ requests, type }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-6">
        {type.charAt(0).toUpperCase() + type.slice(1)} Requests
      </h2>
      
      <div className="space-y-4">
        {requests.map((request) => (
          <div
            key={request.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-primary">{request.title}</h3>
              <div className="flex items-center gap-2">
                {request.isStarred && <Star className="w-5 h-5 text-yellow-400 fill-current" />}
                {request.isImportant && <AlertCircle className="w-5 h-5 text-red-500" />}
              </div>
            </div>
            <p className="text-gray-600">{request.hospital}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-500">{request.date}</span>
              <span className={`px-2 py-1 rounded text-sm ${
                request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {request.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ManageRequests = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop() || 'inbox';

  return (
    <div className="max-w-4xl mx-auto">
      <Routes>
        <Route path="/" element={<RequestList requests={mockRequests} type="inbox" />} />
        <Route path="inbox" element={<RequestList requests={mockRequests.filter(r => !r.isStarred)} type="inbox" />} />
        <Route path="starred" element={<RequestList requests={mockRequests.filter(r => r.isStarred)} type="starred" />} />
        <Route path="sent" element={<RequestList requests={mockRequests} type="sent" />} />
        <Route path="drafts" element={<RequestList requests={mockRequests} type="drafts" />} />
        <Route path="trash" element={<RequestList requests={[]} type="trash" />} />
        <Route path="important" element={<RequestList requests={mockRequests.filter(r => r.isImportant)} type="important" />} />
      </Routes>
    </div>
  );
};

export default ManageRequests;