// src/App.tsx
import React, { useEffect, useState } from 'react';
import Sidebar from '@/Components/SideBar';
import Navbar from '@/Components/NavBar';
import MainContent from '@/PagesJs/Dashboard/Main';
import { useAuth } from '@/context/AuthContext';

const App: React.FC = () => {
    const { user, getToken } = useAuth();
    const [token, setToken] = useState<string | null>('');

    useEffect(()=>{
        const token = getToken();
        console.log(token);
        setToken(token)
    },[])

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Navbar />
        <MainContent user={user} getToken={token}/>
      </div>
    </div>
  );
};

export default App;
