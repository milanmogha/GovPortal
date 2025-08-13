import React from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { BarChart3, FileText, Settings, LogOut, Briefcase } from 'lucide-react'; // Added Briefcase icon

const SidebarLink = ({ to, icon, children }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      `flex items-center p-3 my-1 rounded-lg transition-colors ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`
    }
  >
    {icon}
    <span className="ml-3">{children}</span>
  </NavLink>
);

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* --- Sidebar --- */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col flex-shrink-0">
        <div className="h-16 flex items-center justify-center border-b border-gray-700">
          <Link to="/admin" className="text-xl font-bold text-white">Admin Panel</Link>
        </div>
        <nav className="flex-1 px-4 py-4">
          <SidebarLink to="/admin/dashboard" icon={<BarChart3 size={20} />}>
            Dashboard
          </SidebarLink>
          <SidebarLink to="/admin/applications" icon={<FileText size={20} />}>
            Applications
          </SidebarLink>
          {/* --- This is the new link --- */}
          <SidebarLink to="/admin/jobs" icon={<Briefcase size={20} />}>
            Manage Jobs
          </SidebarLink>
          <SidebarLink to="/admin/analytics" icon={<BarChart3 size={20} />}>
            Analytics
          </SidebarLink>
          <SidebarLink to="/admin/settings" icon={<Settings size={20} />}>
            Settings
          </SidebarLink>
        </nav>
        <div className="px-4 py-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center p-3 rounded-lg text-red-300 hover:bg-red-900 hover:text-white transition-colors"
          >
            <LogOut size={20} />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;