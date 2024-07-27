// src/App.tsx
import React, { useEffect, useState } from 'react';
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
