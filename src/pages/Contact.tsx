import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['1800-XXX-XXXX (Toll Free)', '+91-11-2345-6789'],
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['recruitment@gov.in', 'support@govrecruitit.in'],
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['Government Complex', 'New Delhi - 110001, India'],
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Monday - Friday: 09:00 - 18:00', 'Saturday: 10:00 - 14:00'],
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const faqs = [
    {
      question: 'How do I apply for a government IT position?',
      answer: 'You can apply by visiting our Job Listings page, selecting the desired position, and filling out the comprehensive application form.'
    },
    {
      question: 'What documents do I need to submit?',
      answer: 'You need to submit a updated resume/CV (PDF format) and a passport-size photograph (JPG/PNG format). Additional documents may be required based on the position.'
    },
    {
      question: 'How long does the recruitment process take?',
      answer: 'The recruitment process typically takes 4-8 weeks, depending on the position and number of applications received.'
    },
    {
      question: 'Can I track my application status?',
      answer: 'Yes, you can track your application status through your personal dashboard after logging into your account.'
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get in touch with our recruitment team for any questions or support
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className={`${info.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <info.icon className={info.color} size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
              {info.details.map((detail, idx) => (
                <p key={idx} className="text-gray-600 text-sm">{detail}</p>
              ))}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <MessageCircle className="text-blue-600 mr-3" size={28} />
              <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Subject</option>
                    <option value="application">Application Query</option>
                    <option value="technical">Technical Support</option>
                    <option value="general">General Inquiry</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Please describe your query in detail..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* FAQ Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            {/* Office Hours */}
            <div className="bg-blue-50 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                Support Hours
              </h3>
              <div className="space-y-2 text-blue-800">
                <p><strong>Phone Support:</strong> Mon-Fri, 9:00 AM - 6:00 PM</p>
                <p><strong>Email Support:</strong> 24/7 (Response within 24 hours)</p>
                <p><strong>Office Visits:</strong> Mon-Fri, 10:00 AM - 5:00 PM (By appointment only)</p>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-900 mb-4">
                Emergency Contact
              </h3>
              <p className="text-red-800 text-sm">
                For urgent technical issues during application deadlines, 
                please call our emergency helpline: <strong>+91-11-XXXX-XXXX</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Visit Our Office
          </h2>
          <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-600">
              <MapPin size={48} className="mx-auto mb-4" />
              <p className="text-lg font-medium">Interactive Map</p>
              <p className="text-sm">Government Complex, New Delhi - 110001</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;