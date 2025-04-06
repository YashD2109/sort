import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import 'chart.js/auto';
import { Chart as ChartJS, BarElement, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, ArcElement, Tooltip, Legend);


// Raw Data for Branch Statistics (Replace with API call if needed)
const mockBranchData = {
  id: 'b001',
  name: 'City General Branch',
  location: 'Downtown, City Center',
  totalBeds: 200,
  occupiedBeds: 150,
  availableBeds: 50,
  totalDoctors: 40,
  totalNurses: 100,
  totalPatients: 180,
  emergencyCases: 20,
  outpatientVisits: 400,
  departmentStats: {
    Cardiology: 50,
    Orthopedics: 30,
    Neurology: 40,
    Oncology: 60,
  },
};

const BranchDashboard = () => {
  const [branchData, setBranchData] = useState(mockBranchData);
  const navigate = useNavigate();

  // Commented-out API Fetch (Uncomment if fetching from an API)
  /*
  useEffect(() => {
    fetch('https://api.example.com/branch-data')
      .then(response => response.json())
      .then(data => setBranchData(data))
      .catch(error => console.error('Error fetching branch data:', error));
  }, []);
  */

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-primary mb-6">Branch Dashboard</h1>
      <p className="text-lg text-gray-600 mb-4">{branchData.name} - {branchData.location}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Beds</h2>
          <p className="text-3xl font-bold text-primary">{branchData.totalBeds}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Occupied Beds</h2>
          <p className="text-3xl font-bold text-red-500">{branchData.occupiedBeds}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Available Beds</h2>
          <p className="text-3xl font-bold text-green-500">{branchData.availableBeds}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Staff</h2>
          <p className="text-3xl font-bold text-blue-500">{branchData.totalDoctors + branchData.totalNurses}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bed Usage Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Bed Usage Statistics</h2>
          <Bar
            data={{
              labels: ['Total Beds', 'Occupied Beds', 'Available Beds'],
              datasets: [
                {
                  label: 'Bed Count',
                  data: [branchData.totalBeds, branchData.occupiedBeds, branchData.availableBeds],
                  backgroundColor: ['#4F46E5', '#EF4444', '#10B981'],
                },
              ],
            }}
          />
        </div>

        {/* Patient Breakdown Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Patient Breakdown</h2>
          <Pie
            data={{
              labels: ['Emergency Cases', 'Outpatient Visits', 'Inpatients'],
              datasets: [
                {
                  data: [branchData.emergencyCases, branchData.outpatientVisits, branchData.totalPatients],
                  backgroundColor: ['#F59E0B', '#3B82F6', '#8B5CF6'],
                },
              ],
            }}
          />
        </div>
      </div>

      {/* Department Statistics */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">Department Statistics</h2>
        <Bar
          data={{
            labels: Object.keys(branchData.departmentStats),
            datasets: [
              {
                label: 'Number of Patients',
                data: Object.values(branchData.departmentStats),
                backgroundColor: '#14B8A6',
              },
            ],
          }}
        />
      </div>

      {/* Navigation Button */}
      <div className="mt-8">
        <button
          onClick={() => navigate('/hospital-management')}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Back to Hospital Management
        </button>
      </div>
    </div>
  );
};

export default BranchDashboard;
