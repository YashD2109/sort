import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 28.7041, // Centered around Delhi
  lng: 77.1025,
};

const AmbulanceDispatch = () => {
  const [ambulances, setAmbulances] = useState([]);
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);
  const [dispatchResponse, setDispatchResponse] = useState(null);
  const [dispatchForm, setDispatchForm] = useState({
    emergency_type: "",
    patient_location: "",
    priority_level: "",
    requested_by: "Emergency Dept.",
  });
  

  useEffect(() => {
    const fetchDummyAmbulances = () => {
      const dummyData = [
        { id: "AMB123456", lat: 28.7041, lng: 77.1025, status: "Free" },
        { id: "AMB987654", lat: 28.705, lng: 77.103, status: "En Route" },
        { id: "AMB654321", lat: 28.706, lng: 77.104, status: "Arrived" },
        { id: "AMB111222", lat: 28.707, lng: 77.105, status: "Busy" },
      ];
      setAmbulances(dummyData);
    };

    fetchDummyAmbulances();
    const interval = setInterval(fetchDummyAmbulances, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchAmbulanceStatus = (ambulanceId) => {
    const dummyResponse = {
      ambulance_id: ambulanceId,
      status: "En Route",
      current_location: "5th Avenue, 3km from the hospital",
      estimated_arrival_time: "2025-02-18T14:00:00Z",
    };

    setSelectedAmbulance(dummyResponse);
  };

  const handleDispatchInputChange = (e) => {
    setDispatchForm({ ...dispatchForm, [e.target.name]: e.target.value });
  };

  const handleDispatchAmbulance = () => {
    if (!dispatchForm.emergency_type || !dispatchForm.patient_location || !dispatchForm.priority_level) {
      alert("Please fill all fields!");
      return;
    }

    const dummyDispatchResponse = {
      message: "Ambulance dispatched successfully",
      ambulance_id: "AMB123456",
      estimated_arrival_time: "2025-02-18T14:00:00Z",
    };

    setDispatchResponse(dummyDispatchResponse);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Free":
        return "green";
      case "En Route":
        return "blue";
      case "Arrived":
        return "orange";
      case "Busy":
        return "red";
      default:
        return "black";
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", backgroundColor: "#F4EBDC" }}>
    <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#3A506B" }}>
       Ambulance Dispatch System
    </h2>
  
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Google Map */}
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={14}>
          {ambulances.map((ambulance) => (
            <Marker
              key={ambulance.id}
              position={{ lat: ambulance.lat, lng: ambulance.lng }}
              onClick={() => fetchAmbulanceStatus(ambulance.id)}
            />
          ))}
        </GoogleMap>
      </LoadScript>
  
      {/* Ambulance Details Section */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
        {ambulances.map((ambulance) => (
          <div
            key={ambulance.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: "#D8C3A5", // Warm Sand
              width: "300px",
              color: "#3A506B", // Deep Steel Blue
            }}
          >
            <p><strong>Ambulance ID:</strong> {ambulance.id}</p>
            <p><strong>Location:</strong> {ambulance.lat}, {ambulance.lng}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span style={{ color: getStatusColor(ambulance.status), fontWeight: "bold" }}>
                {ambulance.status}
              </span>
            </p>
            <button
              style={{
                padding: "5px 10px",
                backgroundColor: "#264653", // Deep Teal
                color: "#fff",
                border: "none",
                borderRadius: "3px",
              }}
              onClick={() => fetchAmbulanceStatus(ambulance.id)}
            >
              📡 Get Status
            </button>
          </div>
        ))}
      </div>
  
      {/* Selected Ambulance Details */}
{selectedAmbulance && (
  <div
    style={{
      padding: "20px",
      border: "1px solid #A9927D", // Muted Taupe border
      borderRadius: "8px",
      backgroundColor: "#B08968", // Warm Mocha Brown
      color: "#fff",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      marginBottom: "20px",
    }}
  >
    <h3 style={{ textAlign: "center", fontSize: "22px", marginBottom: "15px" }}>
      📡 Real-time Ambulance Status
    </h3>
    <p><strong>Ambulance ID:</strong> {selectedAmbulance.ambulance_id}</p>
    <p><strong>Status:</strong> <span style={{ color: getStatusColor(selectedAmbulance.status), fontWeight: "bold" }}>{selectedAmbulance.status}</span></p>
    <p><strong>Current Location:</strong> {selectedAmbulance.current_location}</p>
    <p><strong>Estimated Arrival Time:</strong> {selectedAmbulance.estimated_arrival_time}</p>
  </div>
)}

{/* Dispatch Ambulance Form */}
<div
  style={{
    padding: "20px",
    border: "2px solid #A9927D", // Muted Taupe border
    borderRadius: "8px",
    backgroundColor: "#E29578", // Soft Coral
    color: "#fff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    
  }}
>
  <h3 style={{ textAlign: "center", fontSize: "22px", marginBottom: "15px" }}>Dispatch an Ambulance</h3>

  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      gap: "15px", // Space between fields
      marginBottom: "20px",
    }}
  >
    <div style={{ flex: 1 }}>
      <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Emergency Type:</label>
      <input
        type="text"
        name="emergency_type"
        onChange={handleDispatchInputChange}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#fff",
          border: "1px solid #C8B6A6", // Dusty Rose Beige
          borderRadius: "5px",
          fontSize: "16px",
        }}
      />
    </div>

    <div style={{ flex: 1, marginLeft: "15px" }}>
      <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Patient Location:</label>
      <input
        type="text"
        name="patient_location"
        onChange={handleDispatchInputChange}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#fff",
          border: "1px solid #C8B6A6", // Dusty Rose Beige
          borderRadius: "5px",
          fontSize: "16px",
        }}
      />
    </div>

    <div style={{ flex: 1, marginLeft: "15px" }}>
      <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Priority Level:</label>
      <select
        name="priority_level"
        onChange={handleDispatchInputChange}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#fff",
          border: "1px solid #C8B6A6", // Dusty Rose Beige
          borderRadius: "5px",
          fontSize: "16px",
        }}
      >
        <option value="">Select Priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>
  </div>

  {/* Additional Fields */}
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      gap: "15px", // Space between fields
      marginBottom: "20px",
    }}
  >
    <div style={{ flex: 1 }}>
      <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Requested By:</label>
      <input
        type="text"
        name="requested_by"
        onChange={handleDispatchInputChange}
        style={{
          width: "30%",
          padding: "10px",
          backgroundColor: "#fff",
          border: "1px solid #C8B6A6", // Dusty Rose Beige
          borderRadius: "5px",
          fontSize: "16px",
        }}
      />
    </div>

    </div>

  <div style={{ textAlign: "center", marginBottom: "20px" }}>
    <button
      onClick={handleDispatchAmbulance}
      style={{
        padding: "12px 20px",
        backgroundColor: "#F77F00", // Warm Orange
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
       Dispatch Ambulance
    </button>
  </div>

  {dispatchResponse && (
    <div
      style={{
        marginTop: "15px",
        padding: "15px",
        border: "1px solid #A4161A", // Rich Red
        backgroundColor: "#e0ffe0",
        borderRadius: "5px",
      }}
    >
      <h3 style={{ color: "#28a745" }}>✅ {dispatchResponse.message}</h3>
      <p><strong>Ambulance ID:</strong> {dispatchResponse.ambulance_id}</p>
      <p><strong>Estimated Arrival Time:</strong> {dispatchResponse.estimated_arrival_time}</p>
    </div>
  )}
</div>
      </div>
    </div>
  
   
  );
};

export default AmbulanceDispatch;