import React, { useState, useEffect } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';

const EHRManagement = () => {
  const [patientId, setPatientId] = useState('');
  const [ehrData, setEhrData] = useState({
    allergies: ['Peanuts', 'Dust'],
    chronic_conditions: ['Hypertension'],
    current_medications: ['Lisinopril'],
    past_surgeries: ['Appendectomy'],
    recent_diagnoses: ['Cold'],
    doctor_notes: 'Patient is doing well after surgery.',
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [fetchedEhr, setFetchedEhr] = useState({
    allergies: ['Peanuts', 'Dust'],
    chronic_conditions: ['Hypertension'],
    current_medications: ['Lisinopril'],
    past_surgeries: ['Appendectomy'],
    recent_diagnoses: ['Cold'],
    doctor_notes: 'Patient is doing well after surgery.',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEhrData({
      ...ehrData,
      [name]: name === 'doctor_notes' ? value : value.split(',').map(item => item.trim()),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Commented out API call
    // try {
    //   const response = await axios.post(`/patients/${patientId}/ehr`, {
    //     patient_id: patientId,
    //     ...ehrData,
    //   });
    //   setResponseMessage(response.data.message);
    // } catch (error) {
    //   console.error('Error updating EHR:', error);
    //   setResponseMessage('An error occurred while updating the EHR.');
    // }
    setResponseMessage('EHR updated (API call commented out)');
  };

  const handleFetchEHR = () => {
    // Commented out API call
    // try {
    //   const response = await axios.get(`/patients/${patientId}/ehr`);
    //   setFetchedEhr(response.data);
    // } catch (error) {
    //   console.error('Error fetching EHR:', error);
    //   setResponseMessage('An error occurred while fetching the EHR.');
    // }
    setFetchedEhr({
      allergies: ['Peanuts', 'Dust'],
      chronic_conditions: ['Hypertension'],
      current_medications: ['Lisinopril'],
      past_surgeries: ['Appendectomy'],
      recent_diagnoses: ['Cold'],
      doctor_notes: 'Patient is doing well after surgery.',
    });
    setResponseMessage('Fetched EHR data (API call commented out)');
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Electronic Health Records (EHR) Management</h1>
      <form className="bg-light p-4 rounded shadow mb-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input type="text" placeholder="Patient ID (e.g. PAT123456)" value={patientId} onChange={(e) => setPatientId(e.target.value)} className="form-control" required />
        </div>
        <h5>Patient EHR Details:</h5>
        <div className="mb-3">
          <textarea name="doctor_notes" placeholder="Doctor Notes" value={ehrData.doctor_notes} onChange={handleChange} className="form-control" />
        </div>
        {['allergies', 'chronic_conditions', 'current_medications', 'past_surgeries', 'recent_diagnoses'].map((field) => (
          <div className="mb-3" key={field}>
            <input type="text" name={field} placeholder={`${field.replace('_', ' ')} (comma-separated)`} value={ehrData[field].join(', ')} onChange={handleChange} className="form-control" />
          </div>
        ))}
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success">Update EHR</button>
          <button type="button" className="btn btn-primary" onClick={handleFetchEHR}>Fetch EHR</button>
        </div>
      </form>
     
    </div>
  );
};

export default EHRManagement;
