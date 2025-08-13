import React, { useState, useEffect } from 'react';
import { BarChart3, Eye, CheckCircle, X, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const getStatusBadge = (status) => {
    const statusStyles = {
      'Under Review': 'bg-yellow-100 text-yellow-800',
      'Shortlisted': 'bg-blue-100 text-blue-800',
      'Interview Scheduled': 'bg-indigo-100 text-indigo-800',
      'Selected': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
    };
    return statusStyles[status] || 'bg-gray-100 text-gray-800';
};

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalApplications: 0,
        pendingReview: 0,
        shortlisted: 0,
        interviewScheduled: 0,
    });
    const [recentApplications, setRecentApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!token) {
                setError("Authentication token not found.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/applications', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data. You may not have admin privileges.');
                }

                const applications = await response.json();

                // Calculate stats from the fetched data
                setStats({
                    totalApplications: applications.length,
                    pendingReview: applications.filter(app => app.status === 'Under Review').length,
                    shortlisted: applications.filter(app => app.status === 'Shortlisted').length,
                    interviewScheduled: applications.filter(app => app.status === 'Interview Scheduled').length,
                });

                // Get the 5 most recent applications
                setRecentApplications(applications.slice(0, 5));

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [token]);

    const statCards = [
        { title: 'Total Applications', value: stats.totalApplications, color: 'text-blue-600', bgColor: 'bg-blue-100' },
        { title: 'Pending Review', value: stats.pendingReview, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
        { title: 'Shortlisted', value: stats.shortlisted, color: 'text-green-600', bgColor: 'bg-green-100' },
        { title: 'Interviews Scheduled', value: stats.interviewScheduled, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    ];

    if (loading) {
        return <div className="flex justify-center items-center h-64"><Loader2 className="w-12 h-12 animate-spin text-blue-600" /></div>;
    }

    if (error) {
        return <div className="text-center py-10 bg-red-50 border border-red-200 rounded-lg text-red-600">{error}</div>;
    }

    return (
        <div className="space-y-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">High-level overview of recruitment activities.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`${stat.bgColor} p-3 rounded-full`}>
                                <BarChart3 className={stat.color} size={24} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Applications Table */}
            <div className="bg-white rounded-lg shadow-md">
                <div className="flex justify-between items-center p-6">
                    <h2 className="text-xl font-bold text-gray-900">Recent Applications</h2>
                    <Link to="/admin/applications" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                        View All
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applied On</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {recentApplications.length > 0 ? (
                                recentApplications.map((app) => (
                                    <tr key={app._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{app.firstName} {app.lastName}</div>
                                            <div className="text-sm text-gray-500">{app.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{app.position}</div>
                                            <div className="text-sm text-gray-500">{app.department}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(app.appliedDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(app.status)}`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <Link to="/admin/applications" className="text-blue-600 hover:text-blue-900" title="View Details"><Eye size={16} /></Link>
                                            <button className="text-green-600 hover:text-green-900" title="Shortlist"><CheckCircle size={16} /></button>
                                            <button className="text-red-600 hover:text-red-900" title="Reject"><X size={16} /></button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No applications found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;