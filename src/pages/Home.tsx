import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Briefcase, Users, Award, TrendingUp, ArrowRight, Bell, LayoutDashboard } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // New state to hold user data if logged in
  const [user, setUser] = useState(null);

  // Check for user token on component load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
      } catch (error) {
        console.error("Invalid token:", error);
        // Optional: clear invalid token
        localStorage.removeItem('token');
      }
    }
  }, []);

  const announcements = [
    {
      title: "New IT Officer Positions Available",
      description: "Government of India announces 500+ new IT Officer positions across various departments. Applications open until August 31, 2025.",
      image: "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=800",
      urgent: true
    },
    {
      title: "Digital India Initiative Expansion",
      description: "Join the Digital India mission! Exciting opportunities for Software Engineers, Data Scientists, and Cybersecurity Specialists.",
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
      urgent: false
    },
    {
      title: "Technology Modernization Program",
      description: "Be part of India's technological transformation. Senior positions available for experienced IT professionals.",
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
      urgent: false
    }
  ];

  const stats = [
    { icon: Briefcase, label: "Active Jobs", value: "1,250+", color: "bg-blue-500" },
    { icon: Users, label: "Registered Users", value: "15,000+", color: "bg-green-500" },
    { icon: Award, label: "Successful Placements", value: "3,500+", color: "bg-purple-500" },
    { icon: TrendingUp, label: "Growth Rate", value: "85%", color: "bg-orange-500" },
  ];

  const recentJobs = [
    {
      title: "Senior Software Engineer",
      department: "Ministry of Electronics & IT",
      location: "New Delhi",
      experience: "5-8 years",
      salary: "₹8-12 LPA",
      deadline: "Aug 25, 2025"
    },
    {
      title: "Data Scientist",
      department: "NITI Aayog",
      location: "Mumbai",
      experience: "3-5 years",
      salary: "₹7-10 LPA",
      deadline: "Aug 30, 2025"
    },
    {
      title: "Cybersecurity Analyst",
      department: "Defense Ministry",
      location: "Bengaluru",
      experience: "4-6 years",
      salary: "₹9-13 LPA",
      deadline: "Sep 05, 2025"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % announcements.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Carousel */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={announcements[currentSlide].image}
            alt={announcements[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-2xl">
            {announcements[currentSlide].urgent && (
              <div className="flex items-center space-x-2 mb-4">
                <Bell className="text-red-400" size={20} />
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  URGENT
                </span>
              </div>
            )}
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {announcements[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              {announcements[currentSlide].description}
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/jobs"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Browse Jobs</span>
                <ArrowRight size={20} />
              </Link>
              {/* Show "Apply Now" if logged out, "Dashboard" if logged in */}
              {user ? (
                 <Link
                    to="/dashboard"
                    className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
                 >
                    Go to Dashboard
                 </Link>
              ) : (
                <Link
                    to="/register"
                    className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
                >
                    Apply Now
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
        >
          <ChevronRight size={24} />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {announcements.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`${stat.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className="text-white" size={32} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Jobs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest Job Opportunities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover exciting career opportunities in government IT sector
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentJobs.map((job, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                  <p className="text-blue-600 font-medium mb-4">{job.department}</p>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-6">
                    <div className="flex justify-between">
                      <span>Location:</span>
                      <span>{job.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Experience:</span>
                      <span>{job.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Salary:</span>
                      <span className="font-semibold text-green-600">{job.salary}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Deadline:</span>
                      <span className="font-semibold text-red-600">{job.deadline}</span>
                    </div>
                  </div>
                  
                  <Link
                    to="/apply"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Apply Now</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/jobs"
              className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors inline-flex items-center space-x-2"
            >
              <span>View All Jobs</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* === UPDATED Call to Action Section === */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {user ? (
                // Logged-in View
                <>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Welcome Back!
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        You're one step closer to your dream government job. Manage your profile or continue your job search.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <Link
                          to="/dashboard"
                          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
                        >
                          <LayoutDashboard size={20} />
                          <span>Go to Dashboard</span>
                        </Link>
                        <Link
                          to="/jobs"
                          className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                        >
                          Browse Jobs
                        </Link>
                    </div>
                </>
            ) : (
                // Logged-out View
                <>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to Start Your Government IT Career?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of IT professionals who have found their dream careers in the government sector.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <Link
                          to="/register"
                          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                        >
                          Create Account
                        </Link>
                        <Link
                          to="/about"
                          className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                        >
                          Learn More
                        </Link>
                    </div>
                </>
            )}
        </div>
      </section>
    </div>
  );
};

export default Home;