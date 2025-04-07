// src/components/DoctorList.jsx
import { Link } from "react-router-dom";
import { doctors } from "./Doctor";

const DoctorList = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Doctors</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {doctors.map((doc) => (
          <Link to={`/doctor/${doc.name}`} key={doc.id} className="bg-white rounded-2xl p-4 shadow hover:shadow-lg transition">
            <div className="flex items-center space-x-4">
              <img src={doc.image} alt={doc.name} className="w-16 h-16 rounded-full" />
              <div>
                <h3 className="text-lg font-semibold">{doc.name}</h3>
                <p className="text-sm text-gray-500">{doc.specialization}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
