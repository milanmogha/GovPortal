import React, { useState } from 'react';
import { Users, FileText, BarChart3, Settings, Search, Filter, Download, Eye, CheckCircle, X } from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data
  const stats = [
    { title: 'Total Applications', value: '1,247', change: '+12%', color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { title: 'Pending Review', value: '328', change: '+5%', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    { title: 'Shortlisted', value: '156', change: '+8%', color: 'text-green-600', bgColor: 'bg-green-100' },
    { title: 'Interviews Today', value: '24', change: '-2%', color: 'text-purple-600', bgColor: 'bg-purple-100' },
  ];

  const applications = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      position: 'Senior Software Engineer',
      department: 'Ministry of Electronics & IT',
      appliedDate: '2025-02-10',
      status: 'Under Review',
      experience: '5-8 years',
      qualification: 'B.Tech Computer Science',
      score: 85
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      position: 'Data Scientist',
      department: 'NITI Aayog',
      appliedDate: '2025-02-08',
      status: 'Shortlisted',
      experience: '3-5 years',
      qualification: 'M.Tech Data Science',
      score: 92
    },
    {
      id: 3,
      name: 'Amit Singh',
      email: 'amit.singh@email.com',
      position: 'Cybersecurity Analyst',
      department: 'Defense Ministry',
      appliedDate: '2025-02-05',
      status: 'Interview Scheduled',
      experience: '4-6 years',
      qualification: 'B.E. Information Security',
      score: 88
    },
    {
      id: 4,
      name: 'Sneha Patel',
      email: 'sneha.patel@email.com',
      position: 'Cloud Engineer',
      department: 'Ministry of Finance',
      appliedDate: '2025-02-03',
      status: 'Selected',
      experience: '3-6 years',
      qualification: 'MCA',
      score: 95
    },
    {
      id: 5,
      name: 'Vikram Reddy',
      email: 'vikram.reddy@email.com',
      position: 'Mobile App Developer',
      department: 'Ministry of Health',
      appliedDate: '2025-02-01',
      status: 'Rejected',
      experience: '2-4 years',
      qualification: 'B.Sc Computer Science',
      score: 72
    }
  ];

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status.toLowerCase().replace(' ', '') === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Under Review': 'bg-yellow-100 text-yellow-800',
      'Shortlisted': 'bg-green-100 text-green-800',
      'Interview Scheduled': 'bg-blue-100 text-blue-800',
      'Selected': 'bg-green-200 text-green-900',
      'Rejected': 'bg-red-100 text-red-800'
    };
    return statusStyles[status] || 'bg-gray-100 text-gray-800';
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-full`}>
                <BarChart3 className={stat.color} size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Applications</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.slice(0, 5).map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{app.name}</div>
                      <div className="text-sm text-gray-500">{app.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{app.position}</div>
                    <div className="text-sm text-gray-500">{app.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {app.score}/100
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-2">
                      <Eye size={16} />
                    </button>
                    <button className="text-green-600 hover:text-green-900 mr-2">
                      <CheckCircle size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <X size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderApplications = () => (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex-1 md:max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search applications..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex space-x-4">
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="underreview">Under Review</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="interviewscheduled">Interview Scheduled</option>
              <option value="selected">Selected</option>
              <option value="rejected">Rejected</option>
            </select>
            
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position & Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qualification
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{app.name}</div>
                      <div className="text-sm text-gray-500">{app.email}</div>
                      <div className="text-xs text-gray-400">Applied: {app.appliedDate}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{app.position}</div>
                    <div className="text-sm text-gray-500">{app.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{app.qualification}</div>
                    <div className="text-sm text-gray-500">{app.experience}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{app.score}/100</div>
                    <div className={`text-xs ${app.score >= 85 ? 'text-green-600' : app.score >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {app.score >= 85 ? 'Excellent' : app.score >= 70 ? 'Good' : 'Below Average'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900" title="View Details">
                        <Eye size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-900" title="Approve">
                        <CheckCircle size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900" title="Reject">
                        <X size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Status Distribution</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Under Review</span>
              <span className="text-sm font-medium">328 (26%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '26%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Shortlisted</span>
              <span className="text-sm font-medium">156 (13%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '13%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Interview Scheduled</span>
              <span className="text-sm font-medium">89 (7%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '7%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Departments by Applications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Ministry of Electronics & IT</span>
              <span className="text-sm font-medium">342 applications</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Defense Ministry</span>
              <span className="text-sm font-medium">289 applications</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Ministry of Finance</span>
              <span className="text-sm font-medium">234 applications</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">NITI Aayog</span>
              <span className="text-sm font-medium">187 applications</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600">Manage applications and recruitment process</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <BarChart3 size={16} />
                <span>Dashboard</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'applications'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <FileText size={16} />
                <span>Applications</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <BarChart3 size={16} />
                <span>Analytics</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Settings size={16} />
                <span>Settings</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'applications' && renderApplications()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Settings</h2>
            <p className="text-gray-600">Settings panel coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;