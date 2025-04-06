// pages/DoctorPage.jsx
import React, { useState } from "react";
import DoctorCard from "./DoctorCard";
import DoctorModal from "./DoctorModel";

const doctors = [
  {
    id: 1,
    name: "Dr. Anjali Mehta",
    specialization: "Cardiologist",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Dr. Rajeev Kumar",
    specialization: "Dermatologist",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Dr. Sneha Verma",
    specialization: "Pediatrician",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const Doctor = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <div className="min-h-screen bg-[#F4EBDC] p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-[#3A506B]">Available Doctors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <DoctorCard key={doc.id} doctor={doc} onSelect={setSelectedDoctor} />
        ))}
      </div>

      {selectedDoctor && (
        <DoctorModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
      )}
    </div>
  );
};

export default Doctor;
