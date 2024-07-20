// src/App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={'test'} />
      </Routes>
    </div>
  );
}

export default App;
