import React, { useState } from "react";
import { FileCheck } from "lucide-react";

const schemes = [
  {
    id: 1,
    name: "National Health Insurance Program",
    coverage: "Comprehensive healthcare coverage",
    eligibility: {
      income: 50000,
      age: 18,
      gender: "Any",
      residency: ["Citizen", "Permanent Resident"],
    },
    benefits: ["Hospital care", "Prescription drugs", "Preventive services"],
  },
  {
    id: 2,
    name: "Medical Assistance Program",
    coverage: "Basic healthcare services",
    eligibility: {
      income: 30000,
      age: 65,
      gender: "Any",
      residency: ["Citizen"],
    },
    benefits: ["Primary care", "Emergency services", "Essential medications"],
  },
  {
    id: 3,
    name: "Women & Children Health Program",
    coverage: "Maternal and child healthcare",
    eligibility: {
      income: 45000,
      age: 0,
      gender: "Female",
      residency: ["Citizen", "Permanent Resident"],
    },
    benefits: ["Prenatal care", "Pediatric services", "Nutritional support"],
  },
  {
    id: 4,
    name: "Senior Citizen Healthcare Plan",
    coverage: "Elderly health and wellness services",
    eligibility: {
      income: 40000,
      age: 60,
      gender: "Any",
      residency: ["Citizen", "Permanent Resident"],
    },
    benefits: ["Geriatric care", "Home nursing", "Subsidized medicine"],
  },
];

export default function PatientApplicationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    income: "",
    age: "",
    gender: "",
    residencyStatus: "",
  });
  
  const [filteredSchemes, setFilteredSchemes] = useState(schemes);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEligibilityCheck = (e) => {
    e.preventDefault();
    const filtered = schemes.filter((scheme) => {
      return (
        (formData.income === "" || Number(formData.income) <= scheme.eligibility.income) &&
        (formData.age === "" || Number(formData.age) >= scheme.eligibility.age) &&
        (formData.gender === "" || scheme.eligibility.gender === "Any" || scheme.eligibility.gender === formData.gender) &&
        (formData.residencyStatus === "" || scheme.eligibility.residency.includes(formData.residencyStatus))
      );
    });
    setFilteredSchemes(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/patient-apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      alert("Application submitted successfully!");
    } else {
      alert("Failed to submit application.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#3A506B] mb-4">Patient Application Form</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#3A506B] mb-4">Patient Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-2 border rounded-md" required />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-2 border rounded-md" required />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full p-2 border rounded-md" required />
            </div>
            <div>
              <label className="block text-sm font-medium">Income ($)</label>
              <input type="number" name="income" value={formData.income} onChange={handleInputChange} className="w-full p-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium">Age</label>
              <input type="number" name="age" value={formData.age} onChange={handleInputChange} className="w-full p-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium">Gender</label>
              <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full p-2 border rounded-md">
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Residency Status</label>
              <select name="residencyStatus" value={formData.residencyStatus} onChange={handleInputChange} className="w-full p-2 border rounded-md">
                <option value="">Select status</option>
                <option value="Citizen">Citizen</option>
                <option value="Permanent Resident">Permanent Resident</option>
                <option value="Temporary Resident">Temporary Resident</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-[#3A506B] text-white py-2 rounded-md">Submit Application</button>
          </form>
        </div>

        <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#3A506B] mb-4">Available Schemes</h2>
          {filteredSchemes.length > 0 ? (
            filteredSchemes.map((scheme) => (
              <div key={scheme.id} className="border rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold">{scheme.name}</h3>
                <p>{scheme.coverage}</p>
                <button className="flex items-center text-blue-600 hover:underline mt-2">
                  <FileCheck className="w-5 h-5 mr-1" /> Apply Now
                </button>
              </div>
            ))
          ) : (
            <p>No matching schemes found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
