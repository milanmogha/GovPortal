import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Briefcase, ArrowRight, Calendar, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  // Filter states remain the same
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');

  // Fetch jobs from the backend when the component mounts
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/jobs');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Your filter arrays can now be generated from the fetched jobs to be dynamic
  const departments = [...new Set(jobs.map(job => job.department))];
  const locations = [...new Set(jobs.map(job => job.location))];
  const experienceLevels = [...new Set(jobs.map(job => job.experience))];

  // The filtering logic remains the same
  const filteredJobs = jobs.filter(job => {
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedDepartment === '' || job.department === selectedDepartment) &&
      (selectedLocation === '' || job.location === selectedLocation) &&
      (selectedExperience === '' || job.experience === selectedExperience)
    );
  });
  
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
  });

  if (loading) {
    return <div className="text-center py-10">Loading job listings...</div>;
  }
  
  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header and Filters Section (no changes needed here) */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Government IT Job Opportunities</h1>
          <p className="text-xl text-gray-600">Discover your next career opportunity</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
             {/* Search and filter inputs remain the same */}
        </div>
        
        <div className="mb-6">
          <p className="text-gray-600">Showing {filteredJobs.length} of {jobs.length} jobs</p>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div key={job._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2 sm:mb-0">{job.title}</h2>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium w-fit">{job.type}</span>
                    </div>

                    <p className="text-blue-600 font-semibold mb-3">{job.department}</p>
                    <p className="text-gray-600 mb-4">{job.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center text-gray-600"><MapPin size={16} className="mr-2" /><span>{job.location}</span></div>
                      <div className="flex items-center text-gray-600"><Briefcase size={16} className="mr-2" /><span>{job.experience}</span></div>
                      <div className="flex items-center text-gray-600"><Clock size={16} className="mr-2" /><span>Deadline: {formatDate(job.deadline)}</span></div>
                      <div className="flex items-center text-gray-600"><Calendar size={16} className="mr-2" /><span>Posted: {formatDate(job.postedDate)}</span></div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Required Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{skill}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-2xl font-bold text-green-600 mb-4 sm:mb-0">{job.salary}</div>
                      <Link to={`/apply?jobId=${job._id}`} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 w-fit">
                        <span>Apply Now</span>
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4"><Filter size={48} className="mx-auto" /></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListings;