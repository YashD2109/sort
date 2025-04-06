import React from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, FileText } from 'lucide-react';

const complianceData = {
  overall: 85,
  categories: [
    {
      name: 'Privacy Rules',
      status: 'compliant',
      items: [
        { name: 'Patient Data Encryption', status: 'compliant' },
        { name: 'Access Controls', status: 'compliant' },
        { name: 'Audit Logs', status: 'warning', message: 'Review needed' }
      ]
    },
    {
      name: 'Security Rules',
      status: 'warning',
      items: [
        { name: 'Risk Assessment', status: 'warning', message: 'Update required' },
        { name: 'Disaster Recovery', status: 'compliant' },
        { name: 'Security Training', status: 'non-compliant', message: 'Overdue' }
      ]
    },
    {
      name: 'Legal Compliance',
      status: 'warning',
      items: [
        { name: 'Business Associate Agreements (BAAs)', status: 'compliant' },
        { name: 'HIPAA Authorization Forms', status: 'warning', message: 'Review needed' },
        { name: 'Breach Notification Policy', status: 'compliant' }
      ]
    }
  ]
};

export default function ComplianceDashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#3A506B] mb-2">HIPAA Compliance Dashboard</h1>
        <p className="text-[#3A506B]/80">Monitor and maintain your organization's HIPAA compliance status</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <Shield className="w-8 h-8 text-[#3A506B]" />
            <span className="text-2xl font-bold text-[#3A506B]">{complianceData.overall}%</span>
          </div>
          <h3 className="text-lg font-semibold text-[#3A506B]">Overall Compliance</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {complianceData.categories.map((category, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-[#3A506B] mb-4">{category.name}</h3>
            <div className="space-y-4">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between p-3 bg-[#F4EBDC] rounded-lg">
                  <div className="flex items-center">
                    {item.status === 'compliant' && <CheckCircle className="w-5 h-5 text-green-500 mr-3" />}
                    {item.status === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-500 mr-3" />}
                    {item.status === 'non-compliant' && <XCircle className="w-5 h-5 text-red-500 mr-3" />}
                    <span className="text-[#3A506B]">{item.name}</span>
                  </div>
                  {item.message && (
                    <span className="text-sm text-[#3A506B]/70">{item.message}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
