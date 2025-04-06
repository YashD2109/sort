import React, { useState } from 'react';
import { FileText, Printer, CreditCard } from 'lucide-react';

const BillGeneration = ({ onPaymentClick }) => {
  const [billData, setBillData] = useState({
    patientName: '',
    patientId: '',
    age: '',
    gender: '',
    treatment: '',
    doctor: '',
    equipment: '',
    medication: '',
    testCharges: '',
    roomCharges: '',
    otherCharges: '',
  });

  const [generatedBill, setGeneratedBill] = useState(null);

  const handleInputChange = (e) => {
    setBillData({ ...billData, [e.target.name]: e.target.value });
  };

  const calculateTotal = () => {
    const testCharges = parseFloat(billData.testCharges) || 0;
    const roomCharges = parseFloat(billData.roomCharges) || 0;
    const otherCharges = parseFloat(billData.otherCharges) || 0;
    return testCharges + roomCharges + otherCharges;
  };

  const handleGenerateBill = (e) => {
    e.preventDefault();
    const total = calculateTotal();
    setGeneratedBill({ ...billData, total });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {!generatedBill ? (
        <form onSubmit={handleGenerateBill} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-[#3A506B] mb-6 flex items-center">
            <FileText className="mr-2" /> Bill Generation Form
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="patientName"
              placeholder="Patient Name"
              className="input-field"
              value={billData.patientName}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="patientId"
              placeholder="Patient ID"
              className="input-field"
              value={billData.patientId}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              className="input-field"
              value={billData.age}
              onChange={handleInputChange}
              required
            />
            <select
              name="gender"
              className="input-field"
              value={billData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input
              type="text"
              name="treatment"
              placeholder="Treatment"
              className="input-field"
              value={billData.treatment}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="doctor"
              placeholder="Doctor Name"
              className="input-field"
              value={billData.doctor}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="equipment"
              placeholder="Equipment Used"
              className="input-field"
              value={billData.equipment}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="medication"
              placeholder="Medication"
              className="input-field"
              value={billData.medication}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="testCharges"
              placeholder="Test Charges"
              className="input-field"
              value={billData.testCharges}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="roomCharges"
              placeholder="Room Charges"
              className="input-field"
              value={billData.roomCharges}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="otherCharges"
              placeholder="Other Charges"
              className="input-field"
              value={billData.otherCharges}
              onChange={handleInputChange}
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-[#3A506B] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
          >
            Generate Bill
          </button>
        </form>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-[#3A506B] mb-6">Generated Bill</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <p><strong>Patient Name:</strong> {generatedBill.patientName}</p>
              <p><strong>Patient ID:</strong> {generatedBill.patientId}</p>
              <p><strong>Age:</strong> {generatedBill.age}</p>
              <p><strong>Gender:</strong> {generatedBill.gender}</p>
              <p><strong>Treatment:</strong> {generatedBill.treatment}</p>
              <p><strong>Doctor:</strong> {generatedBill.doctor}</p>
              <p><strong>Equipment:</strong> {generatedBill.equipment}</p>
              <p><strong>Medication:</strong> {generatedBill.medication}</p>
            </div>
            
            <div className="mt-6 border-t pt-4">
              <h3 className="text-xl font-semibold mb-3">Charges Breakdown</h3>
              <div className="space-y-2">
                <p><strong>Test Charges:</strong> ₹{generatedBill.testCharges}</p>
                <p><strong>Room Charges:</strong> ₹{generatedBill.roomCharges}</p>
                <p><strong>Other Charges:</strong> ₹{generatedBill.otherCharges}</p>
                <p className="text-xl font-bold"><strong>Total Amount:</strong> ₹{generatedBill.total}</p>
              </div>
            </div>
            
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => window.print()}
                className="flex items-center space-x-2 bg-[#D8C3A5] text-[#3A506B] py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
              >
                <Printer size={20} />
                <span>Print Bill</span>
              </button>
              <button
                onClick={() => onPaymentClick(generatedBill)}
                className="flex items-center space-x-2 bg-[#3A506B] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
              >
                <CreditCard size={20} />
                <span>Make Payment</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillGeneration;