import React from 'react';
import ReactDOM from 'react-dom/client';
import { WrappedApp } from './App';
import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/context';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <WrappedApp />
    </AuthProvider>
  </React.StrictMode>,
)
