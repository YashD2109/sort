import React, { useState, useEffect } from "react";
import { UserCircle } from "lucide-react";

const EmergencyDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [emergencyType, setEmergencyType] = useState("");
  const [doctorSpecialization, setDoctorSpecialization] = useState("");
  const [hospitalId, setHospitalId] = useState("");

  // Dummy data for demonstration
  useEffect(() => {
    const fetchDoctors = () => {
      const dummyDoctors = [
        { doctor_id: 1, name: "Dr. John Smith", specialization: "Cardiologist" },
        { doctor_id: 2, name: "Dr. Emily Johnson", specialization: "Dermatologist" },
        { doctor_id: 3, name: "Dr. Michael Brown", specialization: "Pediatrician" },
        { doctor_id: 4, name: "Dr. Sarah Davis", specialization: "Neurologist" },
        { doctor_id: 5, name: "Dr. David Wilson", specialization: "Orthopedic Surgeon" },
        { doctor_id: 6, name: "Dr. Laura Garcia", specialization: "General Practitioner" },
        { doctor_id: 7, name: "Dr. James Martinez", specialization: "Psychiatrist" },
        { doctor_id: 8, name: "Dr. Patricia Rodriguez", specialization: "Endocrinologist" },
      ];
      setDoctors(dummyDoctors);
    };
    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit logic (this is a stub for the form submission)
    alert("Form Submitted");
  };

  return (
    <div className="bg-[#F4EBDC] min-h-screen">
      {/* Navbar */}
      <nav className="bg-[#3A506B] p-4 w-full">
        <h1 className="text-white text-xl font-semibold text-center">Emergency Case Doctor</h1>
      </nav>

      <div className="max-w-7xl mx-auto py-8 px-4 flex flex-col items-center">
        {/* Doctor Cards */}
        <div className="flex flex-wrap gap-6 justify-center w-full mb-10">
          {doctors.slice(0, 6).map((doc) => (
            <div
              key={doc.doctor_id}
              className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
            >
              <UserCircle size={80} className="text-[#6C757D]" /> {/* Muted Gray */}
              <p className="font-semibold mt-2 text-[#3A506B]">{doc.name}</p> {/* Deep Steel Blue */}
              <p className="text-sm text-[#6C757D]">{doc.specialization}</p> {/* Muted Gray */}
              {/* Button to view doctor details */}
             
            </div>
          ))}
        </div>

        {/* Form Section */}
        <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg flex-grow mb-10">
          <h2 className="text-lg font-semibold mb-4 text-[#3A506B] text-center">Route Emergency Case</h2> {/* Deep Steel Blue */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Patient ID"
              className="p-3 border border-[#6C757D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A506B] w-full"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              required
            />
          {/* Emergency Type Dropdown */}
          <input
              type="text"
              placeholder="Emergency Type"
              className="p-3 border border-[#6C757D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A506B] w-full"
              value={emergencyType}
              onChange={(e) => setEmergencyType(e.target.value)}
              required
            />
           

{/* Doctor Specialization Dropdown */}
<select
  className="p-3 border border-[#6C757D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A506B] w-full mt-4"
  value={doctorSpecialization}
  onChange={(e) => setDoctorSpecialization(e.target.value)}
  required
>
  <option value="">Select Doctor Specialization</option>
  <option value="Cardiologist">Cardiologist</option>
  <option value="Neurologist">Neurologist</option>
  <option value="Pulmonologist">Pulmonologist</option>
  <option value="General Physician">General Physician</option>
  <option value="Orthopedic">Orthopedic</option>
  <option value="Pediatrician">Pediatrician</option>
  <option value="Dermatologist">Dermatologist</option>
  <option value="Gynecologist">Gynecologist</option>
  <option value="Oncologist">Oncologist</option>
  <option value="Psychiatrist">Psychiatrist</option>
  <option value="ENT Specialist">ENT Specialist</option>
</select>

            <input
              type="text"
              placeholder="Hospital ID"
              className="p-3 border border-[#6C757D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A506B] w-full"
              value={hospitalId}
              onChange={(e) => setHospitalId(e.target.value)}
              required
            />
            <div className="w-full text-center mt-4">
              <button
                type="submit"
                className="bg-[#3A506B] text-white px-6 py-3 rounded-lg hover:bg-[#32455B] transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmergencyDoctor;
