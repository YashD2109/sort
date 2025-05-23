import React, { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import { FaUserPlus } from "react-icons/fa";

// Dummy patient data
const dummyVitals = [
  {
    patient_id: "PAT123456",
    name: "John Doe",
    icu_device_id: "ICUDEVICE987",
    heart_rate: 78,
    blood_pressure: "120/80",
    oxygen_level: 98,
    temperature: 36.8,
    last_updated: "2025-04-05T10:00:00Z",
    alert_level: "Stable"
  },
  {
    patient_id: "PAT123457",
    name: "Jane Smith",
    icu_device_id: "ICUDEVICE988",
    heart_rate: 92,
    blood_pressure: "140/90",
    oxygen_level: 92,
    temperature: 38.1,
    last_updated: "2025-04-05T10:05:00Z",
    alert_level: "Serious"
  },
  {
    patient_id: "PAT123458",
    name: "Ravi Kumar",
    icu_device_id: "ICUDEVICE989",
    heart_rate: 60,
    blood_pressure: "110/70",
    oxygen_level: 95,
    temperature: 36.0,
    last_updated: "2025-04-05T10:10:00Z",
    alert_level: "Stable"
  },
  {
    patient_id: "PAT123459",
    name: "Anita Gupta",
    icu_device_id: "ICUDEVICE990",
    heart_rate: 110,
    blood_pressure: "160/100",
    oxygen_level: 88,
    temperature: 39.0,
    last_updated: "2025-04-05T10:15:00Z",
    alert_level: "Critical"
  }
];

// Patient detail report component
const PatientReport = ({ vital, onBack }) => {
  const chartData = [
    { name: "HR", value: vital.heart_rate },
    { name: "O2", value: vital.oxygen_level },
    { name: "Temp", value: vital.temperature }
  ];

  return (
    <div className="min-h-screen bg-[#F4EBDC] p-6">
      <button onClick={onBack} className="mb-4 text-sm text-blue-600 underline">
        ← Back to Patient List
      </button>
      <div className="bg-white p-6 rounded-2xl shadow-md border-2 border-[#2B2A4C]">
        <h2 className="text-2xl font-bold text-[#2B2A4C] mb-2">
          {vital.name} ({vital.patient_id})
        </h2>
        <p className="text-gray-600 mb-4">Device ID: {vital.icu_device_id}</p>
        <div className="grid grid-cols-2 gap-4 text-gray-800">
          <p>Heart Rate: <span className="font-bold">{vital.heart_rate} bpm</span></p>
          <p>Blood Pressure: <span className="font-bold">{vital.blood_pressure}</span></p>
          <p>Oxygen Level: <span className="font-bold">{vital.oxygen_level}%</span></p>
          <p>Temperature: <span className="font-bold">{vital.temperature}°C</span></p>
        </div>
        <div className="mt-6 h-60">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line type="monotone" dataKey="value" stroke="#FF6D60" strokeWidth={2} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-right text-gray-500 mt-4">
          Last Updated: {new Date(vital.last_updated).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

// Main Dashboard
const ICUDashboard = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    patient_id: "",
    emergency_type: "",
    doctor_specialization_required: "",
    hospital_id: ""
  });

  const categorized = {
    Critical: dummyVitals.filter(p => p.alert_level === "Critical"),
    Serious: dummyVitals.filter(p => p.alert_level === "Serious"),
    Stable: dummyVitals.filter(p => p.alert_level === "Stable")
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted:\n" + JSON.stringify(formData, null, 2));
    setShowForm(false);
    setFormData({
      patient_id: "",
      emergency_type: "",
      doctor_specialization_required: "",
      hospital_id: ""
    });
  };

  if (selectedPatient) {
    return <PatientReport vital={selectedPatient} onBack={() => setSelectedPatient(null)} />;
  }

  return (
    <div className="min-h-screen bg-[#F4EBDC] p-6 relative">
      <h1 className="text-3xl font-bold text-center text-[#2B2A4C] mb-6">
        ICU Patient List
      </h1>

      {Object.entries(categorized).map(([category, patients]) => (
        <div key={category} className="mb-8">
          <h2 className={`text-xl font-semibold mb-2 ${
            category === "Critical" ? "text-red-600" :
            category === "Serious" ? "text-yellow-600" : "text-green-700"
          }`}>
            {category} Patients
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {patients.map((patient) => (
              <div
                key={patient.patient_id}
                onClick={() => setSelectedPatient(patient)}
                className="cursor-pointer bg-white rounded-2xl shadow-md p-4 border-t-4 
                  transition hover:shadow-xl border-[#2B2A4C]"
              >
                <h3 className="text-lg font-bold text-[#2B2A4C] mb-1">
                  {patient.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">ID: {patient.patient_id}</p>

                <div className="text-sm">
                  <p><span className="font-semibold text-gray-700">Oxygen:</span> {patient.oxygen_level}%</p>
                  <p><span className="font-semibold text-gray-700">Heart Rate:</span> {patient.heart_rate} bpm</p>
                  <p><span className="font-semibold text-gray-700">BP:</span> {patient.blood_pressure}</p>
                  <p><span className="font-semibold text-gray-700">Temp:</span> {patient.temperature}°C</p>
                </div>

                <div className="mt-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                    patient.alert_level === "Critical"
                      ? "bg-red-100 text-red-600"
                      : patient.alert_level === "Serious"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}>
                    {patient.alert_level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Floating Button */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-6 right-6 bg-[#2B2A4C] text-white p-4 rounded-full shadow-lg hover:bg-[#3E3D65] transition"
      >
        <FaUserPlus size={24} />
      </button>

      {/* Pop-up Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-lg border-2 border-[#2B2A4C]">
            <h2 className="text-xl font-bold text-[#2B2A4C] mb-4">Add New Patient</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                type="text"
                name="patient_id"
                placeholder="Patient ID"
                value={formData.patient_id}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
             
              <select
  name="emergency_type"
  value={formData.emergency_type}
  onChange={handleInputChange}
  className="w-full p-2 border rounded"
>
  <option value="">Select Emergency Type</option>
  <option value="Critical">Critical</option>
  <option value="Serious">Serious</option>
  <option value="Stable">Stable</option>
</select>

              <input
                type="text"
                name="doctor_specialization_required"
                placeholder="Required Specialization"
                value={formData.doctor_specialization_required}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
              <input
                type="text"
                name="hospital_id"
                placeholder="Hospital ID"
                value={formData.hospital_id}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#2B2A4C] text-white px-4 py-2 rounded-md hover:bg-[#3E3D65]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ICUDashboard;
