import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, FileText, Users, Shield } from 'lucide-react';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFAQ, setOpenFAQ] = useState(null);

  const categories = [
    { id: 'all', name: 'All Questions', icon: HelpCircle },
    { id: 'application', name: 'Application Process', icon: FileText },
    { id: 'eligibility', name: 'Eligibility', icon: Users },
    { id: 'technical', name: 'Technical Support', icon: Shield },
  ];

  const faqs = [
    {
      id: 1,
      category: 'application',
      question: 'How do I apply for a government IT position?',
      answer: 'To apply for a government IT position, visit our Job Listings page, browse through available positions, and click "Apply Now" on your preferred job. You\'ll need to complete our comprehensive application form with your personal, educational, and professional details, along with uploading your resume and photograph.'
    },
    {
      id: 2,
      category: 'application',
      question: 'What documents do I need to submit?',
      answer: 'You need to submit: 1) Updated resume/CV in PDF format, 2) Passport-size photograph in JPG/PNG format, 3) Educational certificates (if shortlisted), 4) Experience certificates (if applicable), 5) Government-issued ID proof. Additional documents may be required based on the specific position.'
    },
    {
      id: 3,
      category: 'application',
      question: 'Can I apply for multiple positions?',
      answer: 'Yes, you can apply for multiple positions. However, we recommend applying only for positions that match your qualifications and experience. Each application will be evaluated separately, and you may receive multiple interview calls if shortlisted for different positions.'
    },
    {
      id: 4,
      category: 'application',
      question: 'How can I track my application status?',
      answer: 'After submitting your application, you can track its status through your personal dashboard. Log in to your account and navigate to the "Applications" tab to see real-time updates on your application progress, interview schedules, and results.'
    },
    {
      id: 5,
      category: 'eligibility',
      question: 'What are the age requirements for government IT jobs?',
      answer: 'Generally, the age limit is 18-35 years for most IT positions. However, age relaxations are provided: OBC candidates get 3 years, SC/ST candidates get 5 years, and PWD candidates get 10 years relaxation. Specific positions may have different age criteria, which will be mentioned in the job description.'
    },
    {
      id: 6,
      category: 'eligibility',
      question: 'What educational qualifications are required?',
      answer: 'Minimum qualification is typically a Bachelor\'s degree in Computer Science, IT, or related fields (B.Tech, BCA, B.Sc CS). For senior positions, Master\'s degrees (M.Tech, MCA, M.Sc) are preferred. Some positions may require specific certifications or additional qualifications as mentioned in the job requirements.'
    },
    {
      id: 7,
      category: 'eligibility',
      question: 'Is work experience mandatory for all positions?',
      answer: 'No, we have positions for both freshers and experienced professionals. Entry-level positions welcome fresh graduates, while senior positions require 3-8+ years of relevant experience. The experience requirements are clearly mentioned in each job posting.'
    },
    {
      id: 8,
      category: 'technical',
      question: 'What if I face technical issues during application submission?',
      answer: 'If you encounter technical issues: 1) Clear your browser cache and cookies, 2) Try using a different browser, 3) Ensure stable internet connection, 4) Contact our technical support at support@govrecruitit.in or call 1800-XXX-XXXX. Our team is available Monday-Friday, 9 AM-6 PM.'
    },
    {
      id: 9,
      category: 'technical',
      question: 'What file formats are accepted for document upload?',
      answer: 'Resume/CV: PDF format only (max 5MB). Photograph: JPG or PNG format only (max 2MB). Ensure your resume is clearly formatted and your photograph is passport-size with a clear background. Other documents should be in PDF format when requested.'
    },
    {
      id: 10,
      category: 'application',
      question: 'How long does the recruitment process take?',
      answer: 'The complete recruitment process typically takes 6-12 weeks: Application review (1-2 weeks), Written test/Technical screening (1 week), Interview rounds (2-3 weeks), Document verification (1 week), Final selection and offer (1-2 weeks). Timeline may vary based on the position and number of applications.'
    },
    {
      id: 11,
      category: 'application',
      question: 'What is the selection process?',
      answer: 'The selection process includes: 1) Application screening, 2) Technical assessment/Written test, 3) Technical interview, 4) HR interview, 5) Document verification, 6) Medical examination (if required), 7) Final offer. Some positions may have additional rounds like group discussions or presentations.'
    },
    {
      id: 12,
      category: 'eligibility',
      question: 'Do I need to be an Indian citizen to apply?',
      answer: 'Yes, Indian citizenship is mandatory for all government positions. You will need to provide proof of citizenship during the document verification process. Overseas Citizens of India (OCI) and Persons of Indian Origin (PIO) are not eligible for government employment.'
    },
    {
      id: 13,
      category: 'technical',
      question: 'Can I edit my application after submission?',
      answer: 'Once submitted, applications cannot be edited. However, you can update your profile information and upload new documents through your dashboard. If you notice critical errors in your submitted application, contact our support team immediately for assistance.'
    },
    {
      id: 14,
      category: 'application',
      question: 'What happens if I miss the application deadline?',
      answer: 'Applications submitted after the deadline will not be considered. We strictly adhere to published deadlines. However, in exceptional circumstances (technical issues on our end), deadlines may be extended, and such announcements will be made on our website and through registered user notifications.'
    },
    {
      id: 15,
      category: 'eligibility',
      question: 'Are there reservations in government IT jobs?',
      answer: 'Yes, reservation policies as per Government of India guidelines are followed: SC (15%), ST (7.5%), OBC (27%), EWS (10%), and PWD (4% horizontal reservation). Candidates claiming reservation must submit valid certificates during document verification.'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our government IT recruitment process
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search FAQs..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <category.icon size={16} />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq) => (
              <div key={faq.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  {openFAQ === faq.id ? (
                    <ChevronUp className="text-gray-500 flex-shrink-0" size={20} />
                  ) : (
                    <ChevronDown className="text-gray-500 flex-shrink-0" size={20} />
                  )}
                </button>
                
                {openFAQ === faq.id && (
                  <div className="px-6 pb-4">
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <HelpCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs found</h3>
              <p className="text-gray-600">Try adjusting your search terms or category filter.</p>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-blue-700 mb-6">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="/contact"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="mailto:support@govrecruitit.in"
              className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FileText className="mx-auto h-8 w-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Application Guide</h3>
            <p className="text-gray-600 text-sm">Step-by-step guide to applying</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Users className="mx-auto h-8 w-8 text-green-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Eligibility Checker</h3>
            <p className="text-gray-600 text-sm">Check if you meet the requirements</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Shield className="mx-auto h-8 w-8 text-purple-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Technical Support</h3>
            <p className="text-gray-600 text-sm">Get help with technical issues</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;