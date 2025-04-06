import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Clock, Bed, Activity } from 'lucide-react';

const occupancyData = [
  { time: '00:00', load: 45 },
  { time: '04:00', load: 30 },
  { time: '08:00', load: 65 },
  { time: '12:00', load: 85 },
  { time: '16:00', load: 75 },
  { time: '20:00', load: 55 },
];

const resourceAllocation = [
  { name: 'ICU', value: 30 },
  { name: 'ER', value: 25 },
  { name: 'Surgery', value: 20 },
  { name: 'General', value: 25 },
];

const COLORS = ['#3A506B', '#D8C3A5', '#6B8E23', '#8B4513'];

const stats = [
  { icon: Users, label: 'Current Patients', value: '234' },
  { icon: Clock, label: 'Avg Wait Time', value: '18 min' },
  { icon: Bed, label: 'Available Beds', value: '45' },
  { icon: Activity, label: 'Critical Cases', value: '12' },
];

export default function OperationsDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((Stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-[#F4EBDC] rounded-lg">
                <Stat.icon className="h-6 w-6 text-[#3A506B]" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">{Stat.label}</p>
                <p className="text-2xl font-semibold text-[#3A506B]">{Stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-[#3A506B] mb-4">Hospital Load</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="load" fill="#3A506B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-[#3A506B] mb-4">Resource Allocation</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={resourceAllocation}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {resourceAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}