import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Inbox,
  Star,
  Send,
  FileEdit,
  Trash2,
  AlertCircle,
  X,
  FileText,
  Landmark,
  ClipboardList,
  Pill,
  CreditCard,
  FileCheck,
  TrendingUp,
  Shield,
  DollarSign,
  Users,
  Calendar,
  Stethoscope,
  Siren,
  HeartPulse,
  Route,
  MessageSquareText,
} from 'lucide-react';
import { cn } from '../lib/utils';

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: '/',
      subItems: [
        { icon: Inbox, label: 'Audit Log', path: '/audit-log' },
        { icon: Star, label: 'Assign Role', path: '/assign-role' }
      ]
    },
    { icon: Building2, label: 'Hospital Collaboration', path: '/hospitals' },
    {
      icon: Inbox,
      label: 'Manage Requests',
      path: '/manage-requests',
      subItems: [
        { icon: Inbox, label: 'Inbox', path: '/manage-requests/inbox' },
        { icon: Star, label: 'Starred', path: '/manage-requests/starred' },
        { icon: Send, label: 'Sent', path: '/manage-requests/sent' },
        { icon: FileEdit, label: 'Drafts', path: '/manage-requests/drafts' },
        { icon: Trash2, label: 'Trash', path: '/manage-requests/trash' },
        { icon: AlertCircle, label: 'Important', path: '/manage-requests/important' }
      ]
    },
    {
      icon: ClipboardList,
      label: 'Medical Inventory',
      path: '/inventory',
      subItems: [
        { icon: FileText, label: 'List of Medicine', path: '/medicine' },
        { icon: FileEdit, label: 'Add New Medicine', path: '/add-new-medicine' }
      ]
    },
    { icon: Pill, label: 'Prescription Management', path: '/prescription' },
    { icon: FileText, label: 'Compliance Dashboard', path: '/compliance-dashboard' },
    { icon: Landmark, label: 'Government Registry', path: '/government-registry' },
    { icon: FileText, label: 'Bill Generation', path: '/bill-generation' },
    { icon: CreditCard, label: 'Payments', path: '/payment-gateway' },
    { icon: FileCheck, label: 'Insurance Claims', path: '/insurance-dashboard' },
    { icon: Users, label: 'Patient Management', path: '/patients' },
    { icon: Calendar, label: 'Appointments', path: '/appointments' },
    { icon: Stethoscope, label: 'Patient Visits', path: '/visits' },
    { icon: Shield, label: 'EHR Management', path: '/ehr' },
    { icon: TrendingUp, label: 'Risk Prediction', path: '/risk-prediction' },
    { icon: DollarSign, label: 'Operations Dashboard', path: '/operations' },
    { icon: FileText, label: 'Research Interface', path: '/research' },

    // 🚨 New Buttons
    { icon: Siren, label: 'Ambulance Dispatch', path: '/AmbulanceUI' },
    { icon: HeartPulse, label: 'ICU Monitoring Dashboard', path: '/ICU' },
    { icon: Route, label: 'Emergency Case Routing', path: '/emergency-case' },
    { icon: MessageSquareText, label: 'Communication & Support', path: '/support' },
  ];

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="p-4 relative h-screen flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:bg-gray-200"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">MedConnect</h2>

        {/* Scrollable Menu */}
        <div className="overflow-y-auto flex-1 max-h-screen pr-2">
          <nav>
            {menuItems.map((item, index) => (
              <div key={index} className="mb-4">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100",
                      isActive && "bg-gray-200 text-primary font-semibold"
                    )
                  }
                  onClick={!item.subItems ? onClose : undefined}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </NavLink>
                {item.subItems && (
                  <div className="ml-6 mt-2 space-y-1">
                    {item.subItems.map((subItem, subIndex) => (
                      <NavLink
                        key={subIndex}
                        to={subItem.path}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center p-2 rounded-lg text-gray-600 hover:bg-gray-100 text-sm",
                            isActive && "bg-gray-200 text-primary font-medium"
                          )
                        }
                        onClick={onClose}
                      >
                        <subItem.icon className="w-4 h-4 mr-3" />
                        {subItem.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
