// src/components/MainContent.tsx
import InputLabel from '@/Components/InputLabel';
import { User } from '@/types';
import React, { useState } from 'react';

interface MainContentProps {
    user: User | null;
    getToken:  string | null;
  }

const MainContent: React.FC<MainContentProps> = ({user , getToken}) => {
    console.log(getToken);
  return (
    <div className="p-6 bg-gray-100 flex-grow">
      <h1 className="text font-bold mb-6">Ubah password user hotspot mikrotik</h1>
        <InputLabel htmlFor="username" value="username" />
        <input className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"/>
        <InputLabel htmlFor="password" value="password" />
        <input className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"/>
    </div>
  );
};

export default MainContent;