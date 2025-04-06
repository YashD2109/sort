import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppointmentManagement = () => {
  const [formData, setFormData] = useState({
    appointment_id: '',
    patient_id: '',
    doctor_id: '',
    appointment_date: '',
    appointment_time: '',
    reason: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    dob: '',
    gender: '',
    department: '',
    address: '',
  });

  const [appointments, setAppointments] = useState([
    {
      appointment_id: '1',
      patient_id: 'P001',
      doctor_id: 'D001',
      appointment_date: '2025-04-10',
      appointment_time: '10:00 AM',
      reason: 'Routine Checkup',
    },
    {
      appointment_id: '2',
      patient_id: 'P002',
      doctor_id: 'D002',
      appointment_date: '2025-04-12',
      appointment_time: '2:00 PM',
      reason: 'Consultation for Cold',
    },
  ]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (action) => {
    let url, method, body;

    switch (action) {
      case 'register':
        alert('Appointment registered (API call commented out)');
        setAppointments([...appointments, { ...formData, appointment_id: `${appointments.length + 1}` }]);
        break;
      case 'update':
        if (!formData.appointment_id) {
          alert('Please select an appointment to update.');
          return;
        }
        alert('Appointment updated (API call commented out)');
        setAppointments(appointments.map(app =>
          app.appointment_id === formData.appointment_id
            ? { ...app, appointment_date: formData.appointment_date, appointment_time: formData.appointment_time }
            : app
        ));
        break;
      case 'delete':
        if (!formData.appointment_id) {
          alert('Please select an appointment to delete.');
          return;
        }
        alert('Appointment deleted (API call commented out)');
        setAppointments(appointments.filter(app => app.appointment_id !== formData.appointment_id));
        break;
      default:
        return;
    }
  };

  const handleEdit = (appointment) => {
    setFormData({ ...appointment });
  };

  return (
    <div className="container mt-5" style={{ backgroundColor: '#F4EBDC' }}>
      <h2 className="text-center" style={{ color: '#3A506B' }}>Appointment Management</h2>
      <form className="bg-light p-4 rounded shadow mb-4" style={{ backgroundColor: '#D8C3A5' }}>
        <input type="hidden" name="appointment_id" value={formData.appointment_id} />
        <div className="row mb-3">
          <div className="col">
            <input type="text" className="form-control" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
          </div>
          <div className="col">
            <input type="text" className="form-control" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <input type="email" className="form-control" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="col">
            <input type="text" className="form-control" placeholder="Mobile Number" name="mobile" value={formData.mobile} onChange={handleChange} />
          </div>
        </div>
        <div className="mb-3">
          <button type="button" className="btn" style={{ backgroundColor: '#3A506B', color: '#FFF' }} onClick={() => handleSubmit('register')}>Register</button>
          <button type="button" className="btn mx-2" style={{ backgroundColor: '#D8C3A5', color: '#FFF' }} onClick={() => handleSubmit('update')}>Update</button>
          <button type="button" className="btn" style={{ backgroundColor: '#FF4D4D', color: '#FFF' }} onClick={() => handleSubmit('delete')}>Delete</button>
        </div>
      </form>
      <h3 className="mt-5" style={{ color: '#3A506B' }}>Recent Appointments</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Doctor ID</th>
            <th>Appointment Date</th>
            <th>Appointment Time</th>
            <th>Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment.appointment_id}>
              <td>{appointment.patient_id}</td>
              <td>{appointment.doctor_id}</td>
              <td>{appointment.appointment_date}</td>
              <td>{appointment.appointment_time}</td>
              <td>{appointment.reason}</td>
              <td>
                <button className="btn" style={{ backgroundColor: '#3A506B', color: '#FFF' }} onClick={() => handleEdit(appointment)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentManagement;
