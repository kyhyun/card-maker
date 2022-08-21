import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './index.module.css';
import { BrowserRouter } from 'react-router-dom';
import AuthService from './service/auth_service';

const authService = new AuthService();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App authService={authService} />
    </BrowserRouter>
  </React.StrictMode>
);
