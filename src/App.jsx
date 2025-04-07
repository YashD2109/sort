import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import HospitalCollaboration from './pages/HospitalCollaboration';
import HospitalDetails from './pages/HospitalDetails';
import CollaborationForm from './pages/CollaborationForm';
import ManageRequests from './pages/ManageRequests';
import AuditLog from './pages/AuditLog';
import AssignRole from './pages/AssignRole';
import ComplianceDashboard from './pages/ComplianceDashboard';
import GovernmentRegistry from './pages/GovernmentRegistry';
import AboutUs from './pages/AboutUs';
import InventoryPage from "./pages/InventoryPage";
import ListOfMedicinePage from "./pages/ListOfMedicinePage";
import PrescriptionPage from "./pages/PrescriptionPage";
import AddNewMedicinePage from "./pages/AddNewMedicinePage";
import BranchDashboard from './pages/BranchManage';
import BillGeneration from './pages/BillGeneration';
import PaymentGateway from './pages/PaymentGateway';
import InsuranceDashboard from './pages/InsuranceDashboard';
import PatientManagement from './pages/PatientManagement';
import AppointmentManagement from './pages/AppointmentManagement';
import PatientVisit from './pages/PatientVisit';
import EHRManagement from './pages/EHRManagement';
import RiskPrediction from './pages/RiskPrediction';
import OperationsDashboard from './pages/OperationsDashboard';
import ResearchInterface from './pages/ResearchInterface';

import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css'; // Import custom styles
import './custom-bootstrap.scss';
import AmbulanceDispatch from './pages/AmbulanceUI';
import ICUDashboard from './pages/ICUDashboard';
import EmergencyDoctor from './pages/EmergencyDoctor';
import Doctor from './pages/Doctor/Doctor';


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-base">
        <Navbar toggleSidebar={toggleSidebar} showMenuButton={true} />
        <div className="flex">
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/hospitals" element={<HospitalCollaboration />} />
              <Route path="/hospitals/:id" element={<HospitalDetails />} />
              <Route path="/hospitals/:id/collaborate" element={<CollaborationForm />} />
              <Route path="/manage-requests/*" element={<ManageRequests />} />
              <Route path="/audit-log" element={<AuditLog />} />
              <Route path="/assign-role" element={<AssignRole />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/medicine" element={<ListOfMedicinePage />} />
              <Route path="/prescription" element={<PrescriptionPage />} />
              <Route path="/add-new-medicine" element={<AddNewMedicinePage />} />
              <Route path="/compliance-dashboard" element={<ComplianceDashboard />} />
              <Route path="/government-registry" element={<GovernmentRegistry />} />
              <Route path="/manage-branch" element={<BranchDashboard />} />
              <Route path="/bill-generation" element={<BillGeneration />} />
              <Route path="/payment-gateway" element={<PaymentGateway />} />
              <Route path="/insurance-dashboard" element={<InsuranceDashboard />} />
              <Route path="/about-us" element={<AboutUs />} />

              <Route path="/patients" element={<PatientManagement />} />
              <Route path="/appointments" element={<AppointmentManagement />} />
              <Route path="/visits" element={<PatientVisit />} />
              <Route path="/ehr" element={<EHRManagement />} />
              <Route path="/risk-prediction" element={<RiskPrediction />} />
          <Route path="/operations" element={<OperationsDashboard />} />
          <Route path="/research" element={<ResearchInterface />} />
          <Route path="/AmbulanceUI" element={<AmbulanceDispatch/>}/>
          <Route path="/ICU" element={<ICUDashboard/>}/>
          <Route path='/emergency-case' element={<EmergencyDoctor/>}/>
          <Route path='/support' element={<Doctor/>}/>

              <Route path="*" element={<Navigate to="/" />} />

            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
