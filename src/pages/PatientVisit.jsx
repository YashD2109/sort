import React, { useState, useEffect } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';

const PatientVisit = ({ patientId }) => {
  const [doctorId, setDoctorId] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const [followUpRequired, setFollowUpRequired] = useState(false);
  const [nextVisitDate, setNextVisitDate] = useState('');
  const [visitLogs, setVisitLogs] = useState([
    {
      visit_id: 'V123456',
      visit_date: '2025-03-01',
      symptoms: ['Fever', 'Cough'],
      diagnosis: 'Viral Infection',
      treatment: ['Rest', 'Fluids'],
    },
    {
      visit_id: 'V123457',
      visit_date: '2025-03-10',
      symptoms: ['Headache', 'Nausea'],
      diagnosis: 'Migraine',
      treatment: ['Painkillers'],
    },
  ]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const logVisit = () => {
    try {
      // Simulating API response with a success message
      const newLog = {
        visit_id: 'V123458', // Example ID
        visit_date,
        symptoms: symptoms.split(','),
        diagnosis,
        treatment: treatment.split(','),
      };
      setVisitLogs([...visitLogs, newLog]);
      setSuccessMessage('Visit logged successfully!');
    } catch (err) {
      setError('An error occurred while logging the visit.');
    }
  };

  // const fetchVisitLogs = async () => { // API fetch function commented out
  //   try {
  //     const response = await axios.get(`/patients/${patientId}/visit-log`);
  //     setVisitLogs(response.data.visit_logs);
  //   } catch (err) {
  //     setError(err.response ? err.response.data.message : 'An error occurred while fetching visit logs.');
  //   }
  // };

  useEffect(() => {
    // fetchVisitLogs(); // API call commented out
  }, [patientId]);

  return (
    <div className="container mt-5">
      <h2>Patient Visit Log</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Form className="bg-light p-4 rounded shadow mb-4">
        <Form.Group controlId="formDoctorId">
          <Form.Label>Doctor ID</Form.Label>
          <Form.Control type="text" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formVisitDate">
          <Form.Label>Visit Date</Form.Label>
          <Form.Control type="date" value={visitDate} onChange={(e) => setVisitDate(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formSymptoms">
          <Form.Label>Symptoms (comma separated)</Form.Label>
          <Form.Control type="text" value={symptoms} onChange={(e) => setSymptoms(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formDiagnosis">
          <Form.Label>Diagnosis</Form.Label>
          <Form.Control type="text" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formTreatment">
          <Form.Label>Treatment (comma separated)</Form.Label>
          <Form.Control type="text" value={treatment} onChange={(e) => setTreatment(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formFollowUpRequired">
          <Form.Check type="checkbox" label="Follow Up Required" checked={followUpRequired} onChange={(e) => setFollowUpRequired(e.target.checked)} />
        </Form.Group>
        <Form.Group controlId="formNextVisitDate">
          <Form.Label>Next Visit Date</Form.Label>
          <Form.Control type="date" value={nextVisitDate} onChange={(e) => setNextVisitDate(e.target.value)} />
        </Form.Group>
        <Button variant="primary" onClick={logVisit}> Log Visit </Button>
      </Form>
      <h3 className="mt-4">Visit Logs</h3>
      <ul>
        {visitLogs.map(log => (
          <li key={log.visit_id}>
            <strong>Visit ID:</strong> {log.visit_id} | <strong>Date:</strong> {log.visit_date} | <strong>Symptoms:</strong> {log.symptoms.join(', ')} | <strong>Diagnosis:</strong> {log.diagnosis}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientVisit;
