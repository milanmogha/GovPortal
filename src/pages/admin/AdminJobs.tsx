import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, X } from 'lucide-react';

// Define an initial state for the form to easily reset it
const initialFormState = {
    title: '',
    department: '',
    location: '',
    experience: '',
    salary: '',
    deadline: '',
    type: 'Full-time',
    description: '',
    skills: [],
};

const AdminJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingJob, setEditingJob] = useState(null); // null for create, job object for edit
    const [formData, setFormData] = useState(initialFormState);
    
    const token = localStorage.getItem('token');

    // Fetch all jobs from the API
    const fetchJobs = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/jobs');
            const data = await response.json();
            setJobs(data);
        } catch (error) {
            console.error("Failed to fetch jobs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    // --- Form Handling ---

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        if (name === 'skills') {
            // Split comma-separated string into an array of skills
            setFormData({ ...formData, [name]: value.split(',').map(skill => skill.trim()) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const method = editingJob ? 'PUT' : 'POST';
        const url = editingJob 
            ? `http://localhost:5000/api/jobs/${editingJob._id}`
            : 'http://localhost:5000/api/jobs';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || 'Failed to save job.');
            }
            
            closeForm();
            fetchJobs(); // Refresh the job list
        } catch (error) {
            console.error("Form submit error:", error);
            alert(`Error: ${error.message}`);
        }
    };

    const openFormForCreate = () => {
        setEditingJob(null);
        setFormData(initialFormState);
        setIsFormOpen(true);
    };

    const openFormForEdit = (job) => {
        setEditingJob(job);
        // Format the date for the date input and skills for the text input
        const deadlineDate = job.deadline ? new Date(job.deadline).toISOString().split('T')[0] : '';
        const skillsString = job.skills ? job.skills.join(', ') : '';
        setFormData({ ...job, deadline: deadlineDate, skills: skillsString });
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setEditingJob(null);
        setFormData(initialFormState);
    };

    // --- Delete Handling ---

    const handleDelete = async (jobId) => {
        if (window.confirm('Are you sure you want to permanently delete this job posting?')) {
            try {
                const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!response.ok) throw new Error('Failed to delete job.');
                
                fetchJobs(); // Refresh list after deletion
            } catch (error) {
                console.error("Delete error:", error);
                alert(`Error: ${error.message}`);
            }
        }
    };

    return (
        <div className="space-y-6">
            {/* --- Page Header --- */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Manage Jobs</h1>
                    <p className="text-gray-600">Create, edit, and delete job postings for the public site.</p>
                </div>
                <button
                    onClick={openFormForCreate}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                    <PlusCircle size={16} />
                    <span>Create Job</span>
                </button>
            </div>

            {/* --- Jobs Table --- */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr><td colSpan="4" className="text-center py-4">Loading jobs...</td></tr>
                            ) : (
                                jobs.map((job) => (
                                <tr key={job._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.department}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.location}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                                        <button onClick={() => openFormForEdit(job)} className="text-blue-600 hover:text-blue-900"><Edit size={16}/></button>
                                        <button onClick={() => handleDelete(job._id)} className="text-red-600 hover:text-red-900"><Trash2 size={16} /></button>
                                    </td>
                                </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- Create/Edit Form Modal --- */}
            {isFormOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">{editingJob ? 'Edit Job' : 'Create New Job'}</h2>
                            <button onClick={closeForm} className="text-gray-500 hover:text-gray-800"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            {/* Form fields */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Job Title</label>
                                <input type="text" name="title" value={formData.title} onChange={handleFormChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Department</label>
                                    <input type="text" name="department" value={formData.department} onChange={handleFormChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Location</label>
                                    <input type="text" name="location" value={formData.location} onChange={handleFormChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Experience</label>
                                    <input type="text" name="experience" value={formData.experience} onChange={handleFormChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" placeholder="e.g., 3-5 years" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Salary</label>
                                    <input type="text" name="salary" value={formData.salary} onChange={handleFormChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" placeholder="e.g., ₹8-12 LPA" />
                                </div>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700">Application Deadline</label>
                                <input type="date" name="deadline" value={formData.deadline} onChange={handleFormChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea name="description" value={formData.description} onChange={handleFormChange} rows="4" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required></textarea>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700">Skills (comma-separated)</label>
                                <input type="text" name="skills" value={Array.isArray(formData.skills) ? formData.skills.join(', ') : formData.skills} onChange={handleFormChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" placeholder="e.g., React, Node.js, MongoDB" />
                            </div>

                            {/* Form actions */}
                            <div className="flex justify-end gap-4 pt-4">
                                <button type="button" onClick={closeForm} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">Cancel</button>
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                    {editingJob ? 'Save Changes' : 'Create Job'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminJobs;