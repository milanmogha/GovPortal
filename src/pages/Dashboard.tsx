import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, FileText, Camera, Edit, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');

  // Mock user data
  const user = {
    firstName: 'Rajesh',
    lastName: 'Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 9876543210',
    dateOfBirth: '1990-05-15',
    address: 'Sector 15, Noida, Uttar Pradesh - 201301',
    qualification: 'B.Tech Computer Science',
    experience: '5-8 years',
    currentPosition: 'Senior Software Developer',
    profilePhoto: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
  };

  const applications = [
    {
      id: 1,
      position: 'Senior Software Engineer',
      department: 'Ministry of Electronics & IT',
      appliedDate: '2025-02-10',
      status: 'Under Review',
      statusColor: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      icon: Clock
    },
    {
      id: 2,
      position: 'Data Scientist',
      department: 'NITI Aayog',
      appliedDate: '2025-02-05',
      status: 'Shortlisted',
      statusColor: 'text-green-600',
      bgColor: 'bg-green-100',
      icon: CheckCircle
    },
    {
      id: 3,
      position: 'Cloud Engineer',
      department: 'Ministry of Finance',
      appliedDate: '2025-01-28',
      status: 'Interview Scheduled',
      statusColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
      icon: Calendar,
      interviewDate: '2025-03-05'
    }
  ];

  const notifications = [
    {
      id: 1,
      title: 'Application Status Update',
      message: 'Your application for Senior Software Engineer has been shortlisted for the next round.',
      date: '2 hours ago',
      type: 'success'
    },
    {
      id: 2,
      title: 'Interview Scheduled',
      message: 'Interview for Data Scientist position has been scheduled for March 5, 2025.',
      date: '1 day ago',
      type: 'info'
    },
    {
      id: 3,
      title: 'Document Verification',
      message: 'Please upload your latest experience certificate for verification.',
      date: '3 days ago',
      type: 'warning'
    }
  ];

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Edit size={16} />
            <span>Edit Profile</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Photo */}
          <div className="text-center">
            <div className="relative inline-block">
              <img
                src={user.profilePhoto}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
              />
              <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                <Camera size={16} />
              </button>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mt-4">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-gray-600">{user.currentPosition}</p>
          </div>
          
          {/* Personal Details */}
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Mail className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{user.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Calendar className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Date of Birth</p>
                  <p className="font-medium">{user.dateOfBirth}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <User className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Experience</p>
                  <p className="font-medium">{user.experience}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <MapPin className="text-gray-400 mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-medium">{user.address}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <FileText className="text-gray-400" size={20} />
              <div>
                <p className="text-sm text-gray-600">Qualification</p>
                <p className="font-medium">{user.qualification}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderApplicationsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Applications</h2>
        
        <div className="space-y-4">
          {applications.map((application) => (
            <div key={application.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{application.position}</h3>
                  <p className="text-blue-600 font-medium">{application.department}</p>
                  <p className="text-sm text-gray-600 mt-1">Applied on: {application.appliedDate}</p>
                  {application.interviewDate && (
                    <p className="text-sm text-blue-600 font-medium mt-1">
                      Interview Date: {application.interviewDate}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className={`${application.bgColor} ${application.statusColor} px-3 py-1 rounded-full flex items-center space-x-2`}>
                    <application.icon size={16} />
                    <span className="text-sm font-medium">{application.status}</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h2>
        
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{notification.title}</h3>
                  <p className="text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-sm text-gray-500 mt-2">{notification.date}</p>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  notification.type === 'success' ? 'bg-green-100 text-green-800' :
                  notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {notification.type}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome, {user.firstName}!
          </h1>
          <p className="text-xl text-gray-600">
            Manage your profile and track your applications
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
            <div className="text-gray-600">Active Applications</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">1</div>
            <div className="text-gray-600">Interviews Scheduled</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">1</div>
            <div className="text-gray-600">Shortlisted</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'profile'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'applications'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Applications
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'notifications'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Notifications
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'profile' && renderProfileTab()}
            {activeTab === 'applications' && renderApplicationsTab()}
            {activeTab === 'notifications' && renderNotificationsTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;