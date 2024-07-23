// src/components/Navbar.tsx
import React, { useState } from 'react';
import SecondaryButton from './SecondaryButton';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {

    const [isLoading , SetIsLoading] = useState(false);
    const { user, getToken, logout } = useAuth();
    const token = getToken();
    const navigate = useNavigate();

    async function name() {
        console.log(token);
        SetIsLoading(true);
        try{
            const response = await axios.post(
                'api/logout',
                {},
                {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            logout();
            navigate('/');
        }catch(error){
            console.log(error);

        }finally{
            SetIsLoading(false)
        }
    }

  return (
    <div className="w-full bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">Dashboard</div>
      <div className="flex items-center">
        <img
          src="https://via.placeholder.com/40"
          alt="User avatar"
          className="w-10 h-10 rounded-full mr-4"
        />
        <SecondaryButton disabled={isLoading} onClick={name} >Logout</SecondaryButton>
      </div>
    </div>
  );
};

export default Navbar;
