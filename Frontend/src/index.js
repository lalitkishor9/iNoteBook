import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SendEmailProvider } from './context/user/resetPass';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SendEmailProvider>
      <App />
    </SendEmailProvider>
  </React.StrictMode>
);


