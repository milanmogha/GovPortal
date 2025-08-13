import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

// Public Components
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import JobListings from './pages/JobListings';
import ApplicationForm from './pages/ApplicationForm';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Login from './pages/Login';
import Register from './pages/Register';

// Admin Components & Route Protection
import AdminLayout from './components/AdminLayout';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminApplications from './pages/admin/AdminApplications';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminSettings from './pages/admin/AdminSettings';
import AdminJobs from './pages/admin/AdminJobs'; // <-- Import the new AdminJobs component

const MainLayout = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* === PUBLIC & USER ROUTES === */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/apply" element={<ApplicationForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
        </Route>

        {/* === AUTH ROUTES === */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* === PROTECTED ADMIN ROUTES === */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="applications" element={<AdminApplications />} />
          {/* --- This is the new route --- */}
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;