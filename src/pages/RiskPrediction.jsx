import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, ArrowRight, Send } from 'lucide-react';

const mockData = [
  { name: 'Jan', risk: 65 },
  { name: 'Feb', risk: 59 },
  { name: 'Mar', risk: 80 },
  { name: 'Apr', risk: 81 },
  { name: 'May', risk: 56 },
  { name: 'Jun', risk: 55 },
];

export default function RiskPrediction() {
  const [formData, setFormData] = useState({
    patient_id: '',
    symptoms: '',
    age: '',
    gender: '',
    medical_history: ''
  });

  const [prediction, setPrediction] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Placeholder for API integration
    setPrediction({
      message: "Risk predicted successfully",
      disease: "Hypertension",
      probability: 75,
      recommendation: "Schedule an appointment with a cardiologist within 2 weeks"
    });
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-[#3A506B] mb-6">Patient Risk Analysis</h2>
        
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient ID
              </label>
              <input
                type="text"
                name="patient_id"
                value={formData.patient_id}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3A506B] focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3A506B] focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3A506B] focus:border-transparent"
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Symptoms
              </label>
              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3A506B] focus:border-transparent"
                rows="3"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medical History
              </label>
              <textarea
                name="medical_history"
                value={formData.medical_history}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3A506B] focus:border-transparent"
                rows="3"
                required
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3 bg-[#3A506B] text-white rounded-lg hover:bg-opacity-90 flex items-center justify-center space-x-2"
            >
              <Send size={20} />
              <span>Predict Risk</span>
            </button>
          </div>
        </form>

        {prediction && (
          <div className="bg-[#F4EBDC] p-6 rounded-lg">
            <div className="text-green-600 font-medium mb-4">{prediction.message}</div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Predicted Disease:</span>
                <span className="text-[#3A506B]">{prediction.disease}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Probability:</span>
                <span className="text-[#3A506B]">{prediction.probability}%</span>
              </div>
              <div className="flex items-center text-[#3A506B] bg-white p-3 rounded-lg">
                <ArrowRight className="mr-2" />
                <span>{prediction.recommendation}</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="h-[300px] mt-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="risk" stroke="#3A506B" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}