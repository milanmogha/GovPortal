import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Upload, Check, AlertCircle, User, MapPin, GraduationCap, Briefcase, Loader2 } from 'lucide-react';

const ApplicationForm = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const jobId = searchParams.get('jobId');

    const [currentStep, setCurrentStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ message: '', type: '' });

    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '', gender: '', category: '',
        address: '', city: '', state: '', pincode: '',
        highestQualification: '', university: '', graduationYear: '', percentage: '',
        experience: '', currentPosition: '', currentCompany: '', skills: '',
        position: '', department: '', preferredLocation: '',
        resume: null, photo: null,
        achievements: '', references: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!jobId) {
            alert("No job selected. Redirecting to job listings.");
            navigate('/jobs');
            return;
        }

        const fetchJobDetails = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/jobs');
                const jobs = await response.json();
                const currentJob = jobs.find(job => job._id === jobId);
                
                if (currentJob) {
                    setFormData(prev => ({
                        ...prev,
                        position: currentJob.title,
                        department: currentJob.department
                    }));
                } else {
                    throw new Error("Job not found.");
                }
            } catch (error) {
                console.error(error.message);
                alert("Could not load job details. Redirecting...");
                navigate('/jobs');
            }
        };

        fetchJobDetails();
    }, [jobId, navigate]);

    const steps = [
        { number: 1, title: 'Personal Info', icon: User },
        { number: 2, title: 'Address', icon: MapPin },
        { number: 3, title: 'Education', icon: GraduationCap },
        { number: 4, title: 'Experience', icon: Briefcase },
        { number: 5, title: 'Documents', icon: Upload },
        { number: 6, title: 'Review', icon: Check }
    ];
    
    const states = ["Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat", "Rajasthan", "Uttar Pradesh", "West Bengal", "Madhya Pradesh", "Haryana"];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = (e, fieldName) => {
        const file = e.target.files[0];
        setFormData(prev => ({ ...prev, [fieldName]: file }));
    };
    
    const validateStep = (step) => {
        const newErrors = {};
        switch (step) {
            case 1:
                if (!formData.firstName) newErrors.firstName = 'First name is required';
                if (!formData.lastName) newErrors.lastName = 'Last name is required';
                if (!formData.email) newErrors.email = 'Email is required';
                if (!formData.phone) newErrors.phone = 'Phone number is required';
                if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
                break;
            case 2:
                if (!formData.address) newErrors.address = 'Address is required';
                if (!formData.city) newErrors.city = 'City is required';
                if (!formData.state) newErrors.state = 'State is required';
                if (!formData.pincode) newErrors.pincode = 'Pincode is required';
                break;
            case 3:
                if (!formData.highestQualification) newErrors.highestQualification = 'Qualification is required';
                if (!formData.university) newErrors.university = 'University is required';
                if (!formData.graduationYear) newErrors.graduationYear = 'Graduation year is required';
                break;
            case 4:
                if (!formData.experience) newErrors.experience = 'Experience is required';
                break;
            case 5:
                if (!formData.resume) newErrors.resume = 'Resume is required';
                if (!formData.photo) newErrors.photo = 'Photo is required';
                break;
            default:
                break;
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, 6));
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = async () => {
    // ... (validation logic)

    setSubmitting(true);
    setSubmitStatus({ message: '', type: '' });
    
    const data = new FormData();
    // ... (appending form data remains the same)
    Object.keys(formData).forEach(key => {
      if (key !== 'resume' && key !== 'photo' && formData[key]) {
        data.append(key, formData[key]);
      }
    });
    if (formData.resume) data.append('resume', formData.resume);
    if (formData.photo) data.append('photo', formData.photo);
    data.append('job', jobId);

    try {
      const token = localStorage.getItem('token');
      // 👈 CRITICAL: Check if user is logged in before they can apply
      if (!token) {
          throw new Error("You must be logged in to submit an application.");
      }

      const response = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}` // 👈 CRITICAL: Send the token
        },
        body: data,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.msg || 'Submission failed.');

      setSubmitStatus({ message: 'Application submitted successfully! Redirecting...', type: 'success' });
      setTimeout(() => navigate('/dashboard'), 3000);

    } catch (error) {
      setSubmitStatus({ message: error.message, type: 'error' });
    } finally {
      setSubmitting(false);
    }
};


    const renderStepContent = () => {
        if (submitStatus.message) {
            return (
                <div className={`p-6 rounded-md text-center ${submitStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    <p className="font-semibold">{submitStatus.message}</p>
                </div>
            );
        }

        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-lg ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`} />
                                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-lg ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`} />
                                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`} />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-lg ${errors.phone ? 'border-red-500' : 'border-gray-300'}`} />
                                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-lg ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`} />
                                {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                                <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                                    <option value="">Select Category</option>
                                    <option value="general">General</option>
                                    <option value="obc">OBC</option>
                                    <option value="sc">SC</option>
                                    <option value="st">ST</option>
                                    <option value="ews">EWS</option>
                                </select>
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Address Information</h3>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                                <textarea name="address" value={formData.address} onChange={handleInputChange} rows={3} className={`w-full px-3 py-2 border rounded-lg ${errors.address ? 'border-red-500' : 'border-gray-300'}`} />
                                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-lg ${errors.city ? 'border-red-500' : 'border-gray-300'}`} />
                                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                                    <select name="state" value={formData.state} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-lg ${errors.state ? 'border-red-500' : 'border-gray-300'}`}>
                                        <option value="">Select State</option>
                                        {states.map(state => (<option key={state} value={state}>{state}</option>))}
                                    </select>
                                    {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
                                    <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-lg ${errors.pincode ? 'border-red-500' : 'border-gray-300'}`} />
                                    {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Educational Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Highest Qualification *</label>
                                <select name="highestQualification" value={formData.highestQualification} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-lg ${errors.highestQualification ? 'border-red-500' : 'border-gray-300'}`}>
                                    <option value="">Select Qualification</option>
                                    <option value="B.Tech">B.Tech</option>
                                    <option value="M.Tech">M.Tech</option>
                                    <option value="BCA">BCA</option>
                                    <option value="MCA">MCA</option>
                                </select>
                                {errors.highestQualification && <p className="text-red-500 text-sm mt-1">{errors.highestQualification}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">University/College *</label>
                                <input type="text" name="university" value={formData.university} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-lg ${errors.university ? 'border-red-500' : 'border-gray-300'}`} />
                                {errors.university && <p className="text-red-500 text-sm mt-1">{errors.university}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year *</label>
                                <input type="number" name="graduationYear" value={formData.graduationYear} onChange={handleInputChange} min="1990" max="2025" className={`w-full px-3 py-2 border rounded-lg ${errors.graduationYear ? 'border-red-500' : 'border-gray-300'}`} />
                                {errors.graduationYear && <p className="text-red-500 text-sm mt-1">{errors.graduationYear}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Percentage/CGPA</label>
                                <input type="text" name="percentage" value={formData.percentage} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                            </div>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                <label className="block text-sm font-medium text-gray-700">Position Applied For</label>
                                <input type="text" value={formData.position} readOnly className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100" />
                             </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700">Department</label>
                                <input type="text" value={formData.department} readOnly className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100" />
                             </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Total Experience *</label>
                                <select name="experience" value={formData.experience} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-lg ${errors.experience ? 'border-red-500' : 'border-gray-300'}`}>
                                    <option value="">Select Experience</option>
                                    <option value="0-1 years">0-1 years</option>
                                    <option value="1-3 years">1-3 years</option>
                                    <option value="3-5 years">3-5 years</option>
                                    <option value="5-8 years">5-8 years</option>
                                    <option value="8+ years">8+ years</option>
                                </select>
                                {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Current Position</label>
                                <input type="text" name="currentPosition" value={formData.currentPosition} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                            </div>
                             <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Current Company</label>
                                <input type="text" name="currentCompany" value={formData.currentCompany} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                            </div>
                             <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Technical Skills</label>
                                <textarea name="skills" value={formData.skills} onChange={handleInputChange} rows={3} placeholder="List technical skills separated by commas" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                            </div>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Document Upload</h3>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Resume/CV * (PDF only)</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                    <p className="text-sm text-gray-600 mb-2">{formData.resume ? formData.resume.name : 'Click to upload'}</p>
                                    <input type="file" accept=".pdf" onChange={(e) => handleFileUpload(e, 'resume')} className="hidden" id="resume-upload" />
                                    <label htmlFor="resume-upload" className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer">Choose File</label>
                                </div>
                                {errors.resume && <p className="text-red-500 text-sm mt-1">{errors.resume}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Passport Size Photo * (JPG/PNG)</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                    <p className="text-sm text-gray-600 mb-2">{formData.photo ? formData.photo.name : 'Click to upload'}</p>
                                    <input type="file" accept=".jpg,.jpeg,.png" onChange={(e) => handleFileUpload(e, 'photo')} className="hidden" id="photo-upload" />
                                    <label htmlFor="photo-upload" className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer">Choose File</label>
                                </div>
                                {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo}</p>}
                            </div>
                        </div>
                    </div>
                );
            case 6:
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Review Application</h3>
                        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold text-gray-900">Personal Information</h4>
                                    <p className="text-gray-600">{formData.firstName} {formData.lastName}</p>
                                    <p className="text-gray-600">{formData.email}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Position Applied</h4>
                                    <p className="text-gray-600">{formData.position}</p>
                                    <p className="text-gray-600">{formData.department}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Education</h4>
                                    <p className="text-gray-600">{formData.highestQualification}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Experience</h4>
                                    <p className="text-gray-600">{formData.experience}</p>
                                </div>
                            </div>
                            <div className="border-t pt-4">
                                <h4 className="font-semibold text-gray-900 mb-2">Documents</h4>
                                <p className="text-gray-600">Resume: {formData.resume?.name || 'Not uploaded'}</p>
                                <p className="text-gray-600">Photo: {formData.photo?.name || 'Not uploaded'}</p>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Job Application Form</h1>
                    <p className="text-xl text-gray-600">Complete all steps to submit your application</p>
                </div>

                <div className="mb-8">
                    <div className="flex items-center">
                        {steps.map((step, index) => (
                            <React.Fragment key={step.number}>
                                <div className="flex flex-col items-center text-center w-1/6">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 z-10 ${currentStep >= step.number ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                                        {currentStep > step.number ? <Check size={20} /> : <step.icon size={20} />}
                                    </div>
                                    <span className={`text-xs md:text-sm font-medium ${currentStep >= step.number ? 'text-blue-600' : 'text-gray-400'}`}>{step.title}</span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`flex-auto border-t-2 transition-colors duration-500 ${currentStep > step.number ? 'border-blue-600' : 'border-gray-200'}`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8">
                    {renderStepContent()}

                    {!submitStatus.message && (
                        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                            <button
                                onClick={prevStep}
                                disabled={currentStep === 1 || submitting}
                                className="px-6 py-2 rounded-lg font-medium bg-gray-600 text-white hover:bg-gray-700 transition-colors disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            {currentStep < 6 ? (
                                <button
                                    onClick={nextStep}
                                    disabled={submitting}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Next Step
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={submitting}
                                    className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2 disabled:bg-green-400"
                                >
                                    {submitting ? <Loader2 className="animate-spin" /> : <Check size={20} />}
                                    <span>{submitting ? 'Submitting...' : 'Submit Application'}</span>
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApplicationForm;