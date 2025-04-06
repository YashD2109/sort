import React from 'react';
import { 
  Building2,
  ClipboardList,
  Users,
  Activity,
  Calendar,
  Bell
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { icon: Building2, label: 'Partner Hospitals', value: '45' },
    { icon: ClipboardList, label: 'Active Requests', value: '12' },
    { icon: Users, label: 'Collaborating Doctors', value: '156' },
    { icon: Activity, label: 'Success Rate', value: '94%' },
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'New Collaboration Request',
      hospital: 'Central Medical Center',
      time: '2 hours ago',
      type: 'request'
    },
    {
      id: 2,
      title: 'Request Approved',
      hospital: 'City General Hospital',
      time: '5 hours ago',
      type: 'approval'
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      title: 'Cardiology Consultation',
      doctor: 'Dr. Sarah Johnson',
      hospital: 'Central Medical Center',
      date: 'March 20, 2024',
      time: '10:00 AM'
    },
    {
      id: 2,
      title: 'Follow-up Appointment',
      doctor: 'Dr. Michael Chen',
      hospital: 'City General Hospital',
      date: 'March 22, 2024',
      time: '2:30 PM'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
        <p className="text-gray-600">Welcome to your hospital collaboration dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold text-primary">{stat.value}</span>
            </div>
            <h3 className="text-gray-600">{stat.label}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-primary">Recent Activities</h2>
            <Bell className="w-5 h-5 text-gray-500" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4">
                <div className={`p-2 rounded-full ${
                  activity.type === 'request' ? 'bg-blue-100' : 'bg-green-100'
                }`}>
                  {activity.type === 'request' ? (
                    <ClipboardList className="w-5 h-5 text-primary" />
                  ) : (
                    <Activity className="w-5 h-5 text-green-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{activity.title}</h3>
                  <p className="text-sm text-gray-500">{activity.hospital}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-primary">Upcoming Appointments</h2>
            <Calendar className="w-5 h-5 text-gray-500" />
          </div>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="border-l-4 border-primary pl-4">
                <h3 className="font-medium text-gray-900">{appointment.title}</h3>
                <p className="text-sm text-gray-600">{appointment.doctor}</p>
                <p className="text-sm text-gray-500">{appointment.hospital}</p>
                <div className="flex items-center space-x-2 mt-1 text-xs text-gray-400">
                  <span>{appointment.date}</span>
                  <span>•</span>
                  <span>{appointment.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;