// src/components/Sidebar.tsx
import React from 'react';
import { FaHome, FaUser, FaChartPie } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">My Dashboard</div>
      <nav className="flex-grow">
        {/* <ul>
          <li className="p-4 hover:bg-gray-700">
            <FaHome className="inline-block mr-2" /> Home
          </li>
          <li className="p-4 hover:bg-gray-700">
            <FaUser className="inline-block mr-2" /> Profile
          </li>
          <li className="p-4 hover:bg-gray-700">
            <FaChartPie className="inline-block mr-2" /> Analytics
          </li>
        </ul> */}
      </nav>
      <div className="p-4 border-t border-gray-700">© 2024 My Company</div>
    </div>
  );
};

export default Sidebar;
