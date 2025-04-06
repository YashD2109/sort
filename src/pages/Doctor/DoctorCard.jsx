// components/DoctorCard.jsx
import React from "react";

const DoctorCard = ({ doctor, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(doctor)}
      className="bg-white/60 backdrop-blur-md p-4 rounded-2xl shadow cursor-pointer hover:shadow-lg transition-all border border-[#D8C3A5]"
    >
      <div className="flex items-center space-x-4">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-16 h-16 rounded-full border-2 border-[#B08968]"
        />
        <div>
          <h3 className="text-lg font-semibold text-[#3A506B]">{doctor.name}</h3>
          <p className="text-sm text-[#6C757D]">{doctor.specialization}</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
