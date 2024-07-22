// src/App.tsx
import React, { useEffect, useState } from 'react';
import Sidebar from '@/Components/SideBar';
import Navbar from '@/Components/NavBar';
import MainContent from '@/PagesJs/Dashboard/Main';
import { useAuth } from '@/context/AuthContext';

const App: React.FC = () => {

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Navbar />
        <MainContent/>
      </div>
    </div>
  );
};

export default App;
