import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Edit, Calendar, CheckCircle, Clock, Loader2, X } from 'lucide-react';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [profile, setProfile] = useState(null);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboardData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const [profileResponse, appsResponse] = await Promise.all([
                    fetch('http://localhost:5000/api/auth/me', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }),
                    fetch('http://localhost:5000/api/applications/my', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    })
                ]);

                if (!profileResponse.ok || !appsResponse.ok) {
                    localStorage.removeItem('token');
                    throw new Error('Session expired. Please log in again.');
                }

                const profileData = await profileResponse.json();
                const appsData = await appsResponse.json();

                setProfile(profileData);
                setApplications(appsData);

            } catch (err) {
                setError(err.message);
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [navigate]);

    const getStatusInfo = (status) => {
        const info = {
            'Under Review': { color: 'text-yellow-600', bgColor: 'bg-yellow-100', icon: Clock },
            'Shortlisted': { color: 'text-blue-600', bgColor: 'bg-blue-100', icon: CheckCircle },
            'Interview Scheduled': { color: 'text-indigo-600', bgColor: 'bg-indigo-100', icon: Calendar },
            'Selected': { color: 'text-green-600', bgColor: 'bg-green-100', icon: CheckCircle },
            'Rejected': { color: 'text-red-600', bgColor: 'bg-red-100', icon: X },
        };
        return info[status] || { color: 'text-gray-600', bgColor: 'bg-gray-100', icon: Clock };
    };

    const stats = {
        active: applications.length,
        interviews: applications.filter(app => app.status === 'Interview Scheduled').length,
        shortlisted: applications.filter(app => app.status === 'Shortlisted').length,
    };

    const renderProfileTab = () => (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                    <Edit size={16} /><span>Edit Profile</span>
                </button>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{profile.firstName} {profile.lastName}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3"><Mail className="text-gray-400" size={20} /><div><p className="text-sm text-gray-600">Email</p><p className="font-medium">{profile.email}</p></div></div>
                    <div className="flex items-center space-x-3"><Phone className="text-gray-400" size={20} /><div><p className="text-sm text-gray-600">Phone</p><p className="font-medium">{profile.phone}</p></div></div>
                </div>
            </div>
        </div>
    );

    const renderApplicationsTab = () => (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Applications</h2>
            <div className="space-y-4">
                {applications.length > 0 ? (
                    applications.map((app) => {
                        const statusInfo = getStatusInfo(app.status);
                        return (
                            <div key={app._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold">{app.job?.title || app.position}</h3>
                                        <p className="text-blue-600 font-medium">{app.job?.department || app.department}</p>
                                        <p className="text-sm text-gray-600 mt-1">Applied on: {new Date(app.appliedDate).toLocaleDateString()}</p>
                                    </div>
                                    <div className={`${statusInfo.bgColor} ${statusInfo.color} px-3 py-1 rounded-full flex items-center space-x-2`}>
                                        <statusInfo.icon size={16} />
                                        <span className="text-sm font-medium">{app.status}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-gray-600 text-center py-4">You have not submitted any applications yet.</p>
                )}
            </div>
        </div>
    );

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="w-12 h-12 animate-spin text-blue-600" /></div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-600 font-semibold">{error}</div>;
    }

    return (
        <div className="min-h-screen py-8 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome, {profile?.firstName}!</h1>
                    <p className="text-xl text-gray-600">Manage your profile and track your applications</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6 text-center"><div className="text-3xl font-bold text-blue-600 mb-2">{stats.active}</div><div className="text-gray-600">Active Applications</div></div>
                    <div className="bg-white rounded-lg shadow-md p-6 text-center"><div className="text-3xl font-bold text-green-600 mb-2">{stats.interviews}</div><div className="text-gray-600">Interviews</div></div>
                    <div className="bg-white rounded-lg shadow-md p-6 text-center"><div className="text-3xl font-bold text-purple-600 mb-2">{stats.shortlisted}</div><div className="text-gray-600">Shortlisted</div></div>
                </div>
                <div className="bg-white rounded-lg shadow-md">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            <button onClick={() => setActiveTab('profile')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'profile' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Profile</button>
                            <button onClick={() => setActiveTab('applications')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'applications' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Applications</button>
                        </nav>
                    </div>
                    <div className="p-6">
                        {activeTab === 'profile' && profile && renderProfileTab()}
                        {activeTab === 'applications' && renderApplicationsTab()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;