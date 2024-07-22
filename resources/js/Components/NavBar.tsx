// src/components/Navbar.tsx
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <div className="w-full bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">Dashboard</div>
      <div className="flex items-center">
        <img
          src="https://via.placeholder.com/40"
          alt="User avatar"
          className="w-10 h-10 rounded-full mr-4"
        />
        <span className="font-semibold">John Doe</span>
      </div>
    </div>
  );
};

export default Navbar;
