import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { DarkModeContextProvider } from './Context/darkModeContext';
// import { AuthContextProvider } from './Context/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      {/* <AuthContextProvider> */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      {/* </AuthContextProvider> */}
    
    </DarkModeContextProvider>
    
  </React.StrictMode>
);

reportWebVitals();

