import React, { useState, useEffect } from 'react';
import { Loader2, PieChart, Building } from 'lucide-react';

const AdminAnalytics = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchAndProcessAnalytics = async () => {
            if (!token) {
                setError("Authentication token not found.");
                setLoading(false);
                return;
            }

            try {
                // Fetch all applications from the backend
                const response = await fetch('http://localhost:5000/api/applications', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch analytics data.');
                }
                const applications = await response.json();
                const totalApps = applications.length;

                if (totalApps === 0) {
                    setStats({ statusDistribution: [], topDepartments: [] });
                    return;
                }

                // 1. Calculate Status Distribution
                const statusCounts = applications.reduce((acc, app) => {
                    acc[app.status] = (acc[app.status] || 0) + 1;
                    return acc;
                }, {});

                const statusDistribution = Object.entries(statusCounts).map(([name, count]) => ({
                    name,
                    count,
                    percentage: ((count / totalApps) * 100).toFixed(1),
                })).sort((a, b) => b.count - a.count);


                // 2. Calculate Top Departments
                const departmentCounts = applications.reduce((acc, app) => {
                    acc[app.department] = (acc[app.department] || 0) + 1;
                    return acc;
                }, {});
                
                const topDepartments = Object.entries(departmentCounts)
                    .map(([name, count]) => ({ name, count }))
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 5); // Get the top 5

                setStats({ statusDistribution, topDepartments });

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAndProcessAnalytics();
    }, [token]);

    const statusColors = {
        'Under Review': 'bg-yellow-500', 'Shortlisted': 'bg-blue-500',
        'Interview Scheduled': 'bg-indigo-500', 'Selected': 'bg-green-500',
        'Rejected': 'bg-red-500'
    };


    if (loading) {
        return <div className="flex justify-center items-center h-64"><Loader2 className="w-12 h-12 animate-spin text-blue-600" /></div>;
    }

    if (error) {
        return <div className="text-center py-10 bg-red-50 border border-red-200 rounded-lg text-red-600">{error}</div>;
    }
    
    if (!stats || (stats.statusDistribution.length === 0 && stats.topDepartments.length === 0)) {
        return (
             <div className="text-center py-10">
                <h2 className="text-xl font-semibold text-gray-700">No Analytics Data Available</h2>
                <p className="text-gray-500 mt-2">There are no applications in the system yet.</p>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Recruitment Analytics</h1>
                <p className="text-gray-600">Insights into application trends and department statistics.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Application Status Distribution Card */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <PieChart className="mr-2 text-gray-500" />
                        Application Status Distribution
                    </h3>
                    <div className="space-y-4">
                        {stats.statusDistribution.map(status => (
                            <div key={status.name}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-gray-600">{status.name}</span>
                                    <span className="text-sm font-medium">{status.count} ({status.percentage}%)</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div 
                                        className={`${statusColors[status.name] || 'bg-gray-500'} h-2.5 rounded-full`}
                                        style={{ width: `${status.percentage}%` }}>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Top Departments Card */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Building className="mr-2 text-gray-500" />
                        Top Departments by Applications
                    </h3>
                    <ul className="space-y-4">
                        {stats.topDepartments.map(dept => (
                            <li key={dept.name} className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">{dept.name}</span>
                                <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">{dept.count}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;