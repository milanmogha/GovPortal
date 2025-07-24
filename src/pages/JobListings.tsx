import React, { useState } from 'react';
import { Search, Filter, MapPin, Clock, Briefcase, ArrowRight, Calendar } from 'lucide-react';

const JobListings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');

  const jobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      department: "Ministry of Electronics & IT",
      location: "New Delhi",
      experience: "5-8 years",
      salary: "₹8-12 LPA",
      deadline: "Mar 25, 2025",
      type: "Full-time",
      description: "Develop and maintain government web applications and digital services.",
      skills: ["Java", "Spring Boot", "React", "PostgreSQL"],
      postedDate: "Feb 15, 2025"
    },
    {
      id: 2,
      title: "Data Scientist",
      department: "NITI Aayog",
      location: "Mumbai",
      experience: "3-5 years",
      salary: "₹7-10 LPA",
      deadline: "Mar 30, 2025",
      type: "Full-time",
      description: "Analyze large datasets to support policy decisions and governance.",
      skills: ["Python", "R", "Machine Learning", "SQL"],
      postedDate: "Feb 18, 2025"
    },
    {
      id: 3,
      title: "Cybersecurity Analyst",
      department: "Defense Ministry",
      location: "Bengaluru",
      experience: "4-6 years",
      salary: "₹9-13 LPA",
      deadline: "Apr 05, 2025",
      type: "Full-time",
      description: "Protect government systems from cyber threats and vulnerabilities.",
      skills: ["Network Security", "Ethical Hacking", "CISSP", "Firewall"],
      postedDate: "Feb 20, 2025"
    },
    {
      id: 4,
      title: "Cloud Infrastructure Engineer",
      department: "Ministry of Finance",
      location: "Hyderabad",
      experience: "3-6 years",
      salary: "₹8-11 LPA",
      deadline: "Apr 10, 2025",
      type: "Full-time",
      description: "Design and manage cloud infrastructure for financial applications.",
      skills: ["AWS", "Docker", "Kubernetes", "Terraform"],
      postedDate: "Feb 22, 2025"
    },
    {
      id: 5,
      title: "Mobile App Developer",
      department: "Ministry of Health",
      location: "Pune",
      experience: "2-4 years",
      salary: "₹6-9 LPA",
      deadline: "Apr 15, 2025",
      type: "Full-time",
      description: "Develop mobile applications for health and wellness initiatives.",
      skills: ["React Native", "Flutter", "Firebase", "REST APIs"],
      postedDate: "Feb 25, 2025"
    },
    {
      id: 6,
      title: "DevOps Engineer",
      department: "Ministry of Railways",
      location: "Chennai",
      experience: "4-7 years",
      salary: "₹9-12 LPA",
      deadline: "Apr 20, 2025",
      type: "Full-time",
      description: "Implement CI/CD pipelines and maintain railway management systems.",
      skills: ["Jenkins", "Docker", "Kubernetes", "Git"],
      postedDate: "Feb 28, 2025"
    }
  ];

  const departments = [
    "Ministry of Electronics & IT",
    "NITI Aayog",
    "Defense Ministry",
    "Ministry of Finance",
    "Ministry of Health",
    "Ministry of Railways"
  ];

  const locations = ["New Delhi", "Mumbai", "Bengaluru", "Hyderabad", "Pune", "Chennai"];
  const experienceLevels = ["0-2 years", "2-4 years", "3-5 years", "4-6 years", "5-8 years", "8+ years"];

  const filteredJobs = jobs.filter(job => {
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedDepartment === '' || job.department === selectedDepartment) &&
      (selectedLocation === '' || job.location === selectedLocation) &&
      (selectedExperience === '' || job.experience === selectedExperience)
    );
  });

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Government IT Job Opportunities
          </h1>
          <p className="text-xl text-gray-600">
            Discover your next career opportunity in government technology sector
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Department Filter */}
            <div>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            {/* Experience Filter */}
            <div>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
              >
                <option value="">All Experience</option>
                {experienceLevels.map((exp) => (
                  <option key={exp} value={exp}>{exp}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredJobs.length} of {jobs.length} jobs
          </p>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 sm:mb-0">
                      {job.title}
                    </h2>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium w-fit">
                      {job.type}
                    </span>
                  </div>

                  <p className="text-blue-600 font-semibold mb-3">{job.department}</p>
                  <p className="text-gray-600 mb-4">{job.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-2" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Briefcase size={16} className="mr-2" />
                      <span>{job.experience}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock size={16} className="mr-2" />
                      <span>Deadline: {job.deadline}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar size={16} className="mr-2" />
                      <span>Posted: {job.postedDate}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Required Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-2xl font-bold text-green-600 mb-4 sm:mb-0">
                      {job.salary}
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 w-fit">
                      <span>Apply Now</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListings;