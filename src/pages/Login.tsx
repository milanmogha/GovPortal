import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle, CheckCircle } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState({ type: '', content: '' });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
    if (serverMessage.content) {
        setServerMessage({ type: '', content: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMessage({ type: '', content: '' });

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            setServerMessage({ type: 'error', content: data.msg || 'An error occurred.' });
        } else {
            setServerMessage({ type: 'success', content: 'Login successful! Redirecting...' });
            
            localStorage.setItem('token', data.token);

            // === DECODE TOKEN AND REDIRECT BASED ON ROLE ===
            try {
                const decodedToken = jwtDecode(data.token);
                const userRole = decodedToken.user.role;

                setTimeout(() => {
                    if (userRole === 'admin') {
                        navigate('/admin'); // Redirect admins
                    } else {
                        navigate('/dashboard'); // Redirect regular users
                    }
                }, 1500);

            } catch (decodeError) {
                console.error("Error decoding token:", decodeError);
                setServerMessage({ type: 'error', content: 'Invalid session token. Please try again.' });
            }
        }
    } catch (error) {
        console.error('Login failed:', error);
        setServerMessage({ type: 'error', content: 'Could not connect to the server. Please try again later.' });
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">
            Sign in to your Gov Recruit IT account
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {serverMessage.content && (
              <div className={`p-4 rounded-md flex items-center ${serverMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {serverMessage.type === 'success' ? <CheckCircle className="mr-3" /> : <AlertCircle className="mr-3" />}
                {serverMessage.content}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Continue with Google
              </button>
              <button
                type="button"
                className="w-full bg-blue-800 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-900 transition-colors"
              >
                Continue with Facebook
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/admin"
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Admin Login
          </Link>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <Lock className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Security Notice</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                        <p>
                            For your security, please ensure you're on the official government website and never share your login credentials with anyone.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;