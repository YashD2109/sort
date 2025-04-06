import React, { useState, useEffect } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import jsPDF from 'jspdf';

const PatientManagement = () => {
  const [formData, setFormData] = useState({
    id: 'PAT123456',
    name: 'John Doe',
    age: '30',
    gender: 'Male',
    contact: '1234567890',
    email: 'john.doe@example.com',
    address: '123 Main St, City, Country',
    blood_group: 'O+',
    medical_history: 'No significant history.',
    emergency_contact: {
      name: 'Jane Doe',
      relation: 'Wife',
      phone: '0987654321',
    },
  });

  const [patients, setPatients] = useState([
    {
      id: 'PAT123456',
      name: 'John Doe',
      age: '30',
      gender: 'Male',
      contact: '1234567890',
      email: 'john.doe@example.com',
      medical_history: 'No significant history.',
      emergency_contact: { name: 'Jane Doe', relation: 'Wife', phone: '0987654321' },
    },
    {
      id: 'PAT123457',
      name: 'Alice Smith',
      age: '28',
      gender: 'Female',
      contact: '2345678901',
      email: 'alice.smith@example.com',
      medical_history: 'Allergic to penicillin.',
      emergency_contact: { name: 'Bob Smith', relation: 'Brother', phone: '9876543210' },
    },
  ]);
  const [searchId, setSearchId] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // fetchPatients(); // API fetch function is commented out
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.age || formData.age <= 0) newErrors.age = 'Valid age is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) newErrors.email = 'Invalid email format';
    const contactRegex = /^[0-9]{10}$/;
    if (!formData.contact || !contactRegex.test(formData.contact)) newErrors.contact = 'Contact must be 10 digits';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const fetchPatients = async () => { // API fetch function is commented out
  //   try {
  //     const response = await axios.get('http://localhost:5000/patients');
  //     setPatients(response.data);
  //   } catch (error) {
  //     console.error('Error fetching patients:', error);
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('emergency_contact.')) {
      const contactField = name.split('.')[1];
      setFormData({
        ...formData,
        emergency_contact: { ...formData.emergency_contact, [contactField]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddPatient = () => {
    if (!validateForm()) return;
    // const newPatient = { ...formData }; // API call commented out
    // await axios.post('http://localhost:5000/patients', newPatient);
    setPatients([...patients, formData]);
    clearForm();
  };

  const handleUpdatePatient = () => {
    if (!validateForm()) return;
    if (!formData.id) {
      alert('Please fill out the form to update the patient');
      return;
    }
    // await axios.put(`http://localhost:5000/patients/${formData.id}`, formData); // API call commented out
    setPatients(patients.map((patient) => (patient.id === formData.id ? formData : patient)));
    clearForm();
  };

  const handleDeletePatient = (id) => {
    // await axios.delete(`http://localhost:5000/patients/${id}`); // API call commented out
    setPatients(patients.filter((patient) => patient.id !== id));
  };

  const handleSearch = () => {
    if (!searchId.trim()) {
      return;
    }
    const patient = patients.find((patient) => patient.id === searchId);
    if (patient) {
      setFormData(patient);
    } else {
      alert("Patient not found");
    }
  };

  const clearForm = () => {
    setFormData({
      id: '',
      name: '',
      age: '',
      gender: '',
      contact: '',
      email: '',
      address: '',
      blood_group: '',
      medical_history: '',
      emergency_contact: {
        name: '',
        relation: '',
        phone: '',
      },
    });
    setErrors({});
    setSearchId('');
  };

  const generatePDF = (patient) => {
    const doc = new jsPDF();
    doc.text("Patient Report", 20, 10);
    doc.text(`ID: ${patient.id}`, 20, 20);
    doc.text(`Name: ${patient.name}`, 20, 30);
    doc.text(`Age: ${patient.age}`, 20, 40);
    doc.text(`Gender: ${patient.gender}`, 20, 50);
    doc.text(`Contact: ${patient.contact}`, 20, 60);
    doc.text(`Email: ${patient.email}`, 20, 70);
    doc.text(`Address: ${patient.address}`, 20, 80);
    doc.text(`Blood Group: ${patient.blood_group}`, 20, 90);
    doc.text(`Medical History: ${patient.medical_history}`, 20, 100);
    doc.text(`Emergency Contact: ${patient.emergency_contact.name} (${patient.emergency_contact.relation}) - ${patient.emergency_contact.phone}`, 20, 110);
    doc.save(`${patient.name}_Report.pdf`);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Patient Management</h1>
      <form className="bg-light p-4 rounded shadow mb-4">
        <div className="d-flex align-items-center mb-3">
          <input
            type="text"
            placeholder="Search by Patient ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="form-control me-2"
          />
          <button className="btn btn-primary" onClick={handleSearch}>Search</button>
        </div>

        <div className="mb-3">
          <input type="text" name="id" placeholder="Patient ID" value={formData.id} onChange={handleChange} className={`form-control ${errors.id ? 'is-invalid' : ''}`} />
          {errors.id && <div className="invalid-feedback">{errors.id}</div>}
        </div>
        <div className="mb-3">
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="mb-3">
          <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} className={`form-control ${errors.age ? 'is-invalid' : ''}`} />
          {errors.age && <div className="invalid-feedback">{errors.age}</div>}
        </div>
        <div className="mb-3">
          <select name="gender" value={formData.gender} onChange={handleChange} className={`form-control ${errors.gender ? 'is-invalid' : ''}`}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
        </div>
        <div className="mb-3">
          <input type="text" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} className={`form-control ${errors.contact ? 'is-invalid' : ''}`} />
          {errors.contact && <div className="invalid-feedback">{errors.contact}</div>}
        </div>
        <div className="mb-3">
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <textarea name="medical_history" placeholder="Medical History" value={formData.medical_history} onChange={handleChange} className="form-control"></textarea>
        </div>
        <div className="mb-3">
          <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="form-control"></textarea>
        </div>
        <div className="row mb-3">
          <div className="col-md-4 mb-3">
            <input type="text" name="emergency_contact.name" placeholder="Emergency Contact Name" value={formData.emergency_contact.name} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-md-4 mb-3">
            <input type="text" name="emergency_contact.relation" placeholder="Relation" value={formData.emergency_contact.relation} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-md-4 mb-3">
            <input type="text" name="emergency_contact.phone" placeholder="Emergency Contact Phone" value={formData.emergency_contact.phone} onChange={handleChange} className="form-control" />
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-success" onClick={handleAddPatient}>Add</button>
          <button type="button" className="btn btn-warning" onClick={handleUpdatePatient}>Update</button>
          <button type="button" className="btn btn-danger" onClick={() => handleDeletePatient(formData.id)}>Delete</button>
          <button type="button" className="btn btn-info" onClick={clearForm}>Clear</button>
        </div>
      </form>
      <h2 className="mb-3">Patient List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Medical History</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.name}</td>
              <td>{patient.gender}</td>
              <td>{patient.contact}</td>
              <td>{patient.email}</td>
              <td>{patient.medical_history}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => setFormData(patient)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeletePatient(patient.id)}>Delete</button>
                <button className="btn btn-info btn-sm" onClick={() => generatePDF(patient)}>Download PDF</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientManagement;
