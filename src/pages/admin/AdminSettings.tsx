import React from 'react';
import { Settings } from 'lucide-react';

// This is the placeholder for the Settings page.
const AdminSettings = () => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your admin account and notification preferences.</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center text-gray-500">
            <Settings className="w-8 h-8 mr-4" />
            <div>
                <h2 className="text-xl font-bold text-gray-800">Settings Panel</h2>
                <p className="mt-1">This section is currently under development. Please check back later.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;