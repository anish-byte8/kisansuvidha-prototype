import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';

import LanguageSelection from './pages/LanguageSelection';
import Login from './pages/Login';
import Home from './pages/Home';
import Centres from './pages/Centres';
import Booking from './pages/Booking';
import Confirmation from './pages/Confirmation';
import LiveQueue from './pages/LiveQueue';
import ProcurementStatus from './pages/ProcurementStatus';
import PaymentStatus from './pages/PaymentStatus';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import Help from './pages/Help';

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LanguageSelection />} />
          <Route path="/login" element={<Login />} />

          {/* Protected/App Routes wrapped in Layout */}
          <Route path="/home" element={<Layout><Home /></Layout>} />
          <Route path="/centres" element={<Layout><Centres /></Layout>} />
          <Route path="/booking" element={<Layout><Booking /></Layout>} />
          <Route path="/confirmation" element={<Layout><Confirmation /></Layout>} />
          <Route path="/queue" element={<Layout><LiveQueue /></Layout>} />
          <Route path="/status" element={<Layout><ProcurementStatus /></Layout>} />
          <Route path="/payment" element={<Layout><PaymentStatus /></Layout>} />
          <Route path="/notifications" element={<Layout><Notifications /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="/help" element={<Layout><Help /></Layout>} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;
