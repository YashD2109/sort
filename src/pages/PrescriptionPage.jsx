import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloud, Camera, ArrowLeft, ArrowRight } from "lucide-react";
// import "./PrescriptionPage.css";

const PrescriptionPage = () => {
  const navigate = useNavigate();
  const [allergies, setAllergies] = useState("");
  const [medicalConditions, setMedicalConditions] = useState([]);
  const [prescriptionFile, setPrescriptionFile] = useState(null);

  const handleConditionClick = (condition) => {
    setMedicalConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((item) => item !== condition)
        : [...prev, condition]
    );
  };

  const handleFileChange = (e) => {
    setPrescriptionFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      allergies,
      medicalConditions,
      prescriptionFile: prescriptionFile ? prescriptionFile.name : "No file uploaded",
    };

    const csvContent = `data:text/csv;charset=utf-8,${Object.keys(data).join(",")}\n${Object.values(data).join(",")}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "prescription_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert("Prescription uploaded successfully!");
  };

  return (
    <div className="prescription-container p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-8" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Prescription</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block font-semibold">Do you have any allergies?</label>
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          placeholder="Enter your allergies"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
        />

        <label className="block font-semibold">Do you have any medical conditions?</label>
        <div className="flex flex-wrap gap-2">
          {["Diabetes", "Hypertension", "Asthma", "Other"].map((condition) => (
            <button
              type="button"
              key={condition}
              onClick={() => handleConditionClick(condition)}
              className={`px-4 py-2 border rounded-md ${medicalConditions.includes(condition) ? "bg-blue-400 text-white" : "bg-white text-blue-700 border-blue-700"}`}
            >
              {condition}
            </button>
          ))}
        </div>

        <label className="block font-semibold">Do you want to add a prescription?</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer bg-gray-100">
            <UploadCloud className="w-5 h-5" /> Upload Prescription
            <input type="file" onChange={handleFileChange} className="hidden" />
          </label>
          <button type="button" className="px-4 py-2 border rounded-md bg-gray-100 flex items-center gap-2">
            <Camera className="w-5 h-5" /> Camera
          </button>
        </div>

        <div className="flex justify-between mt-6">
          <button type="button" className="flex items-center gap-2 px-4 py-2 border rounded-md text-blue-700" onClick={() => navigate("/")}> 
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
          <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md">
            Continue <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PrescriptionPage;