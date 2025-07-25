import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { useTheme } from './hooks/useTheme';

function App() {
  const { darkMode } = useTheme();
  
  return (
    <div className={darkMode ? 'dark' : ''}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
    </div>
  );
}

export default App;