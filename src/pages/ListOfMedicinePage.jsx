import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilePlus, Trash2, Edit, PlusCircle } from 'lucide-react';
// import './Inventory.css';

const Inventory = () => {
  // const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRefillPopup, setShowRefillPopup] = useState(false);
  const [refillMedicines, setRefillMedicines] = useState([]);
  const [refillQuantity, setRefillQuantity] = useState(50);
  const navigate = useNavigate();
  const medicines = [
    { id: 1, name: "Paracetamol", batchName: "B123", stockQuantity: 10 },
    { id: 2, name: "Ibuprofen", batchName: "B124", stockQuantity: 3 },
    { id: 3, name: "Amoxicillin", batchName: "B125", stockQuantity: 7 },
    { id: 4, name: "Cetirizine", batchName: "B126", stockQuantity: 2 },
    { id: 5, name: "Ranitidine", batchName: "B127", stockQuantity: 5 },
    { id: 6, name: "Metformin", batchName: "B128", stockQuantity: 15 },
    { id: 7, name: "Atorvastatin", batchName: "B129", stockQuantity: 1 },
    { id: 8, name: "Aspirin", batchName: "B130", stockQuantity: 8 },
    { id: 9, name: "Ciprofloxacin", batchName: "B131", stockQuantity: 4 },
    { id: 10, name: "Prednisone", batchName: "B132", stockQuantity: 12 },
  ];
  

  useEffect(() => {
    //fetchMedicines();
    setLoading(false);
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/medicines');
      if (!response.ok) {
        throw new Error('Failed to fetch medicines');
      }
      const data = await response.json();
      setMedicines(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (medicineId) => {
    try {
      await fetch(`http://localhost:5000/api/medicines/${medicineId}`, { method: 'DELETE' });
      fetchMedicines();
    } catch (err) {
      console.error('Failed to delete medicine:', err);
    }
  };

  const openRefillPopup = (medicine) => {
    setRefillMedicines([medicine]);
    setShowRefillPopup(true);
  };

  const handleImmediateRefill = async () => {
    if (refillQuantity <= 0) {
      alert("Please enter a valid refill quantity greater than zero.");
      return;
    }

    try {
      await Promise.all(
        refillMedicines.map((med) =>
          fetch(`http://localhost:5000/api/medicines/${med.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stockQuantity: med.stockQuantity + refillQuantity }),
          })
        )
      );
      fetchMedicines();
      setShowRefillPopup(false);
    } catch (error) {
      console.error("Error updating medicines:", error);
    }
  };

  const handleEdit = () => navigate(`/medicine`);
  const handleViewFullList = () => navigate('/medicine');
  const handlePrescription = () => navigate('/prescription');

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  const lowStock = medicines.filter(med => med.stockQuantity < 5);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">Inventory Management</h1>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="card border-2 border-blue-500 p-4 rounded-md">
          <h2 className="text-2xl font-bold text-blue-600">{medicines.length}</h2>
          <p>Medicines Available</p>
          <button onClick={handleViewFullList} className="text-blue-800 hover:underline">View Full List &raquo;</button>
        </div>
        <div className="card border-2 border-green-500 p-4 rounded-md">
          <FilePlus size={30} className="text-green-500 mx-auto" />
          <p>Prescription</p>
          <button onClick={handlePrescription} className="text-green-800 hover:underline">View Prescription &raquo;</button>
        </div>
        <div className="card border-2 border-red-500 p-4 rounded-md">
          <h2 className="text-2xl font-bold text-red-600">{lowStock.length}</h2>
          <p>Medicine Shortage</p>
          <button onClick={() => setShowRefillPopup(true)} className="text-red-500 hover:underline">Refill Now &raquo;</button>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="table-auto w-full text-center">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Medicine ID</th>
              <th>Batch Name</th>
              <th>Stock in Qty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine) => (
              <tr key={medicine.id}>
                <td>{medicine.name}</td>
                <td>{medicine.id}</td>
                <td>{medicine.batchName}</td>
                <td className={medicine.stockQuantity < 5 ? 'text-red-500' : ''}>{medicine.stockQuantity}</td>
                <td className="text-center align-middle ">
                 <div className="w-full flex flex-row items-center justify-center ">
                   <button onClick={handleEdit} className="text-green-500"><Edit size={20} /></button>
                   <button onClick={() => handleDelete(medicine.id)} className="text-purple-500"><Trash2 size={20} /></button>
                   {medicine.stockQuantity < 5 && (
                     <button onClick={() => openRefillPopup(medicine)} className="text-red-600"><PlusCircle size={20} /></button>
                   )}
                   {/* Invisible button to preserve spacing if only 2 buttons */}
                   {medicine.stockQuantity >= 5 && (
                     <div className="h-[24px] opacity-0"><PlusCircle size={20} /></div>
                   )}
                 </div>
               </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {showRefillPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Refill Medicines</h2>
            <ul>
              {refillMedicines.map((med) => (
                <li key={med.id}>{med.name} (Current Stock: {med.stockQuantity})</li>
              ))}
            </ul>
            <input
              type="number"
              value={refillQuantity}
              onChange={(e) => setRefillQuantity(Number(e.target.value))}
              className="border p-2 rounded w-full my-2"
              placeholder="Enter refill quantity"
            />
            <button onClick={handleImmediateRefill} className="bg-blue-500 text-white px-4 py-2 rounded">Refill All</button>
            <button onClick={() => setShowRefillPopup(false)} className="ml-2 bg-gray-300 px-4 py-2 rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
