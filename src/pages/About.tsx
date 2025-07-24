import React from 'react';
import { Target, Eye, Users, Shield, Award, Globe } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure & Transparent",
      description: "End-to-end security with transparent hiring processes and fair evaluation criteria."
    },
    {
      icon: Users,
      title: "Equal Opportunities",
      description: "Promoting diversity and inclusion in government IT sector with equal opportunities for all."
    },
    {
      icon: Award,
      title: "Merit-Based Selection",
      description: "Purely merit-based selection process ensuring the best candidates get selected."
    },
    {
      icon: Globe,
      title: "Pan-India Presence",
      description: "Opportunities available across all states and union territories of India."
    }
  ];

  const values = [
    "Transparency in all processes",
    "Merit-based selections",
    "Equal opportunity employer",
    "Continuous skill development",
    "Work-life balance",
    "Competitive compensation"
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Gov Recruit IT
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering India's digital transformation by connecting talented IT professionals 
            with meaningful government career opportunities.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Target className="text-blue-600 mr-4" size={32} />
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              To bridge the gap between skilled IT professionals and government opportunities, 
              creating a transparent, efficient, and merit-based recruitment ecosystem that 
              supports India's digital governance initiatives. We strive to democratize access 
              to government IT careers while ensuring the highest standards of talent acquisition.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Eye className="text-green-600 mr-4" size={32} />
              <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              To become India's premier government IT recruitment platform, fostering innovation 
              in public service delivery through technology. We envision a future where the best 
              IT minds contribute to nation-building, driving digital excellence across all 
              government departments and creating lasting impact on citizens' lives.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose Gov Recruit IT?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Transforming Government Recruitment
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Gov Recruit IT was established as part of the Digital India initiative to 
                modernize government recruitment processes. We understand the unique challenges 
                faced by both job seekers and government departments in the IT sector.
              </p>
              <p>
                Our platform leverages cutting-edge technology to provide a seamless experience 
                for candidates while offering government agencies access to a curated pool of 
                qualified IT professionals. From software developers to cybersecurity experts, 
                we cater to diverse IT roles across various government departments.
              </p>
              <p>
                Since our inception, we have successfully facilitated thousands of placements, 
                contributing to India's technological advancement and digital governance capabilities. 
                Our commitment to transparency, efficiency, and merit-based selection has made us 
                the trusted choice for government IT recruitment.
              </p>
            </div>
          </div>
          
          <div>
            <img
              src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Government building"
              className="w-full h-64 object-cover rounded-lg shadow-lg mb-6"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Core Values</h3>
            <ul className="space-y-2">
              {values.map((value, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-blue-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-8">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">15,000+</div>
              <div className="text-blue-100">Registered Candidates</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">3,500+</div>
              <div className="text-blue-100">Successful Placements</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">250+</div>
              <div className="text-blue-100">Government Departments</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;