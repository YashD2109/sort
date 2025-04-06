import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Raw hospital data (Replace with API call if needed)
const mockHospitals = [
  {
    id: '1',
    name: 'Central Medical Center',
    address: '123 Healthcare Ave, Medical District',
    type: 'General Hospital',
    rating: 4.5,
    specialties: ['Cardiology', 'Neurology', 'Oncology'],
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: '2',
    name: 'City General Hospital',
    address: '456 Wellness Blvd, Downtown',
    type: 'Specialty Hospital',
    rating: 4.8,
    specialties: ['Orthopedics', 'Pediatrics'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=500'
  }
];

const HospitalCollaboration = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();

  // Commented-out API fetch section (Uncomment when API is ready)
  /*
  useEffect(() => {
    fetch('https://api.example.com/hospitals')
      .then(response => response.json())
      .then(data => setHospitals(data))
      .catch(error => console.error('Error fetching hospitals:', error));
  }, []);
  */

  const handleCollaborate = (hospitalId) => {
    navigate(`/hospitals/${hospitalId}`);
  };

  const handleManage = (hospitalId) => {
    navigate(`/hospitals/${hospitalId}/manage-branch`);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-4">Hospital Collaboration</h1>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search hospitals, doctors, treatments..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="px-4 py-2 bg-secondary text-primary rounded-lg flex items-center gap-2 hover:bg-opacity-90"
          >
            <Filter size={20} />
            Filter
          </button>
        </div>

        {isFilterOpen && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h3 className="font-semibold mb-4">Filters</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Hospital Type</label>
                <select className="w-full p-2 border rounded">
                  <option>All Types</option>
                  <option>General Hospital</option>
                  <option>Specialty Hospital</option>
                  <option>Clinic</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <select className="w-full p-2 border rounded">
                  <option>All Locations</option>
                  <option>Within 5 miles</option>
                  <option>Within 10 miles</option>
                  <option>Within 20 miles</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <select className="w-full p-2 border rounded">
                  <option>Any Rating</option>
                  <option>4+ Stars</option>
                  <option>3+ Stars</option>
                  <option>2+ Stars</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Price Range</label>
                <select className="w-full p-2 border rounded">
                  <option>All Prices</option>
                  <option>$</option>
                  <option>$$</option>
                  <option>$$$</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockHospitals.map((hospital) => (
          <div key={hospital.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={hospital.image}
              alt={hospital.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-primary mb-2">{hospital.name}</h3>
              <p className="text-gray-600 mb-2">{hospital.address}</p>
              <p className="text-gray-600 mb-2">Type: {hospital.type}</p>
              <div className="flex items-center mb-3">
                <span className="text-yellow-400">★</span>
                <span className="ml-1">{hospital.rating}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {hospital.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-base text-primary rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleCollaborate(hospital.id)}
                  className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Collaborate
                </button>
                <button
                  onClick={() => handleManage(hospital.id)}
                  className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Manage
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalCollaboration;
