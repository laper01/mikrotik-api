// src/App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '@/PagesJs/Login';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login canResetPassword={false}/>} />
      </Routes>
    </div>
  );
}

export default App;
