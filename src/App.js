import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Staf from './pages/Staf';
import Servicii from './pages/Servicii';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import RezervarileMele from './pages/RezervarileMele';
import AdminPanel from './pages/AdminPanel';
import ReviewurileMele from './pages/ReviewurileMele';
import ReviewurileClientilor from './pages/ReviewurileClientilor';
import UserSettings from './pages/UserSettings';
import AdminPanelUploads from './pages/AdminPanelUploads';
import DateleClientilor from "./pages/DateleClientilor"; 
import FormularAI from './pages/FormularAI'; 
import AdminPanelAIReports from './pages/AdminPanelAIReports'
import OrarulMeu from './pages/OrarulMeu';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Navbar />
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/staf" element={<Staf />} />
            <Route path="/servicii" element={<Servicii />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
	    <Route path="/rezervari" element={<RezervarileMele />} />
            <Route path="/admin" element={<AdminPanel />} />
	    <Route path="/reviewurile-mele" element={<ReviewurileMele />} />
	    <Route path="/orarul-meu" element={<OrarulMeu />} />             
            <Route path="/admin/reviews" element={<ReviewurileClientilor />} />
	    <Route path="/user-settings" element={<UserSettings />} />          
            <Route path="/admin/uploads" element={<AdminPanelUploads />} />
	    <Route path="/admin/date-clienti" element={<DateleClientilor />} />
	    <Route path="/form-ai" element={<FormularAI />} />
	    <Route path="/admin/reports-ai" element={<AdminPanelAIReports />} />
		
</Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
