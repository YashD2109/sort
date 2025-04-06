import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, Star, Users, Calendar } from 'lucide-react';

const mockHospital = {
  id: '1',
  name: 'Central Medical Center',
  description: 'A leading healthcare facility providing comprehensive medical services with state-of-the-art technology and expert healthcare professionals.',
  address: '123 Healthcare Ave, Medical District',
  phone: '+1 (555) 123-4567',
  email: 'contact@centralmedical.com',
  rating: 4.5,
  reviews: 128,
  image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=1200',
  specialties: [
    'Cardiology',
    'Neurology',
    'Oncology',
    'Orthopedics',
    'Pediatrics'
  ],
  facilities: [
    'Emergency Department',
    'ICU',
    'Operation Theaters',
    'Diagnostic Center',
    'Pharmacy'
  ],
  doctors: [
    {
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Dr. Michael Chen',
      specialty: 'Neurologist',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200'
    }
  ]
};

const HospitalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleCollaborate = () => {
    navigate(`/hospitals/${id}/collaborate`);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="relative h-96 mb-8 rounded-xl overflow-hidden">
        <img
          src={mockHospital.image}
          alt={mockHospital.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <h1 className="text-4xl font-bold mb-2">{mockHospital.name}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="ml-1">{mockHospital.rating}</span>
              <span className="ml-1 text-sm">({mockHospital.reviews} reviews)</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5" />
              <span className="ml-1">{mockHospital.address}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-primary mb-4">About</h2>
            <p className="text-gray-600">{mockHospital.description}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-primary mb-4">Specialties</h2>
            <div className="grid grid-cols-2 gap-4">
              {mockHospital.specialties.map((specialty, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>{specialty}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-primary mb-4">Facilities</h2>
            <div className="grid grid-cols-2 gap-4">
              {mockHospital.facilities.map((facility, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>{facility}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-primary mb-4">Key Doctors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockHospital.doctors.map((doctor, index) => (
                <div key={index} className="flex items-center gap-4">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{doctor.name}</h3>
                    <p className="text-gray-600">{doctor.specialty}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-primary mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span>{mockHospital.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span>{mockHospital.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span>{mockHospital.address}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-primary mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>Doctors</span>
                </div>
                <span className="font-semibold">50+</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>Years Active</span>
                </div>
                <span className="font-semibold">25</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleCollaborate}
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Start Collaboration
          </button>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetails;