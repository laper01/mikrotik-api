// src/App.tsx
import React, { useEffect, useState } from 'react';
import Sidebar from '@/Components/SideBar';
import Navbar from '@/Components/NavBar';
import MainContent from '@/PagesJs/Dashboard/Main';
import { useAuth } from '@/context/AuthContext';
import Theme from '@/Themes';
import ChangePassword from './Dashboard/ChangePassword';

const App: React.FC = () => {

  return (
    <Theme title='Ubah password user mahasiswa UMMAT'>
        <ChangePassword/>
    </Theme>
  );
};

export default App;
