// src/components/DoctorProfile.jsx
import { useParams } from "react-router-dom";
import { doctors } from "./Doctor";

const DoctorProfile = () => {
  const { name } = useParams();
  const doctor = doctors.find((doc) => doc.name === name);

  if (!doctor) return <div className="p-6 text-red-500">Doctor not found!</div>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-2xl shadow">
      <div className="flex flex-col items-center space-y-4">
        <img src={doctor.image} alt={doctor.name} className="w-24 h-24 rounded-full" />
        <h2 className="text-xl font-bold">{doctor.name}</h2>
        <p className="text-gray-500">{doctor.specialization}</p>
        <div className="flex gap-4 mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600">Call</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600">Message</button>
          <button className="bg-purple-500 text-white px-4 py-2 rounded-xl hover:bg-purple-600">Video Call</button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
