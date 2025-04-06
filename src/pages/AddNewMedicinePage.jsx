import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, ClipboardList, Hash, Package, ArrowLeft } from "lucide-react";

const AddNewMedicinePage = () => {
  const [medicine, setMedicine] = useState({
    name: "",
    id: "",
    group: "",
    quantity: "",
    usage: "",
    sideEffects: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setMedicine({ ...medicine, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("./medicines.json");
    const data = await response.json();
    const updatedData = [...data, medicine];

    await fetch("./medicines.json", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    alert("Medicine added successfully!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F4EBDC] px-4">
      <div className="max-w-lg w-full p-6 bg-white border-2 border-[#D8C3A5] rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-[#3A506B] text-center mb-6 flex items-center justify-center space-x-2">
          <PlusCircle className="w-6 h-6" /> <span>Add New Medicine</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-[#3A506B] flex items-center space-x-2">
              <ClipboardList className="w-5 h-5" /> <span>Medicine Name</span>
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="w-full p-2 border-2 border-[#D8C3A5] rounded-md focus:outline-none focus:border-[#3A506B]"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#3A506B] flex items-center space-x-2">
              <Hash className="w-5 h-5" /> <span>Medicine ID</span>
            </label>
            <input
              type="text"
              name="id"
              onChange={handleChange}
              className="w-full p-2 border-2 border-[#D8C3A5] rounded-md focus:outline-none focus:border-[#3A506B]"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#3A506B] flex items-center space-x-2">
              <Package className="w-5 h-5" /> <span>Medicine Group</span>
            </label>
            <input
              type="text"
              name="group"
              onChange={handleChange}
              className="w-full p-2 border-2 border-[#D8C3A5] rounded-md focus:outline-none focus:border-[#3A506B]"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#3A506B] flex items-center space-x-2">
              <ClipboardList className="w-5 h-5" /> <span>Quantity</span>
            </label>
            <input
              type="number"
              name="quantity"
              onChange={handleChange}
              className="w-full p-2 border-2 border-[#D8C3A5] rounded-md focus:outline-none focus:border-[#3A506B]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#3A506B] text-white py-2 rounded-md font-bold flex items-center justify-center space-x-2 hover:bg-[#2b3a4a] transition"
          >
            <PlusCircle className="w-5 h-5" /> <span>Save Details</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/medicine")}
            className="w-full bg-[#D8C3A5] text-[#3A506B] py-2 rounded-md font-bold flex items-center justify-center space-x-2 hover:bg-[#b9a58a] transition"
          >
            <ArrowLeft className="w-5 h-5" /> <span>Back</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewMedicinePage;
