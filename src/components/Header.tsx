import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogIn, UserPlus, LogOut, LayoutDashboard } from 'lucide-react';
// Make sure you have installed jwt-decode: npm install jwt-decode
import { jwtDecode } from 'jwt-decode';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // This effect runs when the component mounts and whenever the URL path changes.
  // This ensures the header updates correctly after a login or logout.
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
      } catch (error) {
        // If token is invalid, clear it
        localStorage.removeItem('token');
        setUser(null);
      }
    } else {
        setUser(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsMenuOpen(false); // Close mobile menu on logout
    navigate('/login'); // Redirect to login page
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Job Listings', href: '/jobs' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <span>📧 recruitment@gov.in</span>
              <span>📞 1800-XXX-XXXX</span>
            </div>

            {/* === UPDATED User Actions in Top Bar === */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="hidden sm:block">Welcome!</span>
                  <button onClick={handleLogout} className="hover:text-red-300 transition-colors flex items-center space-x-1">
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:text-blue-200 transition-colors flex items-center space-x-1">
                    <LogIn size={16} />
                    <span>Login</span>
                  </Link>
                  <Link to="/register" className="hover:text-blue-200 transition-colors flex items-center space-x-1">
                    <UserPlus size={16} />
                    <span>Register</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">🏛️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gov Recruit IT</h1>
              <p className="text-sm text-gray-600">Government IT Recruitment Portal</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            {/* === UPDATED Conditional Dashboard Link === */}
            {user && (
              <Link
                to="/dashboard"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1"
              >
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t my-2"></div>
              {/* === UPDATED Conditional Mobile Links === */}
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 flex items-center space-x-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 flex items-center space-x-2 text-left w-full"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 flex items-center space-x-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn size={20} />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserPlus size={20} />
                    <span>Register</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;