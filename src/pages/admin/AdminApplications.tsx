import React, { useState, useEffect } from 'react';
import { Search, Download, Eye, CheckCircle, X } from 'lucide-react';

const getStatusBadge = (status) => {
    const statusStyles = {
        'Under Review': 'bg-yellow-100 text-yellow-800', 'Shortlisted': 'bg-blue-100 text-blue-800',
        'Interview Scheduled': 'bg-indigo-100 text-indigo-800', 'Selected': 'bg-green-100 text-green-800',
        'Rejected': 'bg-red-100 text-red-800'
    };
    return statusStyles[status] || 'bg-gray-100 text-gray-800';
};

const AdminApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const token = localStorage.getItem('token');

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/applications', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch applications.');
            const data = await response.json();
            setApplications(data);
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchApplications(); }, []);
    
    const handleStatusUpdate = async (appId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/api/applications/${appId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body: JSON.stringify({ status: newStatus })
            });
            if (!response.ok) throw new Error('Failed to update status');
            fetchApplications();
        } catch (error) {
            alert(error.message);
        }
    }

    const filteredApplications = applications.filter(app => {
        const fullName = `${app.firstName} ${app.lastName}`;
        const matchesSearch = fullName.toLowerCase().includes(searchTerm.toLowerCase()) || app.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || app.status.replace(' ', '').toLowerCase() === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Manage Applications</h1>
                <p className="text-gray-600">Review, filter, and take action on all job applications.</p>
            </div>
            {/* Your Filter and Search JSX Here */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applied On</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr><td colSpan="5" className="text-center py-4">Loading applications...</td></tr>
                            ) : (
                                filteredApplications.map((app) => (
                                    <tr key={app._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <img className="h-10 w-10 rounded-full object-cover mr-4" src={`http://localhost:5000/${app.photo}`} alt={`${app.firstName}`} />
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{app.firstName} {app.lastName}</div>
                                                    <div className="text-sm text-gray-500">{app.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{app.position}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(app.appliedDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(app.status)}`}>{app.status}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                                            <button onClick={() => handleStatusUpdate(app._id, 'Shortlisted')} title="Shortlist" className="text-blue-600 hover:text-blue-900"><CheckCircle size={18} /></button>
                                            <button onClick={() => handleStatusUpdate(app._id, 'Rejected')} title="Reject" className="text-red-600 hover:text-red-900"><X size={18} /></button>
                                            <button title="View Details" className="text-gray-600 hover:text-gray-900"><Eye size={18} /></button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminApplications;