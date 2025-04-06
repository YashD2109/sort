import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Search, Filter } from 'lucide-react';

const treatmentData = [
  { month: 'Jan', success: 85, failure: 15 },
  { month: 'Feb', success: 88, failure: 12 },
  { month: 'Mar', success: 82, failure: 18 },
  { month: 'Apr', success: 91, failure: 9 },
  { month: 'May', success: 84, failure: 16 },
  { month: 'Jun', success: 87, failure: 13 },
];

const patientDemographics = [
  { age: '0-20', male: 120, female: 100 },
  { age: '21-40', male: 250, female: 230 },
  { age: '41-60', male: 180, female: 170 },
  { age: '61-80', male: 150, female: 140 },
  { age: '80+', male: 60, female: 80 },
];

export default function ResearchInterface() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#3A506B] mb-4 md:mb-0">Medical Research Dashboard</h2>
          
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search studies..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A506B]"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
            
            <button className="flex items-center px-4 py-2 bg-[#3A506B] text-white rounded-lg hover:bg-opacity-90">
              <Filter size={20} className="mr-2" />
              Filter
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold text-[#3A506B] mb-4">Treatment Outcomes</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={treatmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="success" stroke="#3A506B" strokeWidth={2} />
                  <Line type="monotone" dataKey="failure" stroke="#D8C3A5" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#3A506B] mb-4">Patient Demographics</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={patientDemographics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="male" fill="#3A506B" />
                  <Bar dataKey="female" fill="#D8C3A5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-[#3A506B] mb-4">Recent Research Findings</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="p-4 bg-[#F4EBDC] rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">Study {item}: Treatment Efficacy Analysis</h4>
                <span className="text-sm text-gray-600">Published: 2025-0{item}-01</span>
              </div>
              <p className="text-gray-600 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}