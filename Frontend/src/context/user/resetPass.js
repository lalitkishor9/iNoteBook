import React, { createContext, useContext, useState } from 'react';
import baseUrl from '../../utils';


const SendEmailContext = createContext();

export const useSendEmail = () => {
  return useContext(SendEmailContext);
};

export const SendEmailProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const host = baseUrl;
  const sendEmail = async (email) => {
    try {
      const response = await fetch(`${host}/api/auth/userverification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      // if (!response.ok) {
      //   throw new Error('Failed to update password');
      // }

      const data = await response.json();
      setEmail(email);
      setCode(data.resetPasswordCode);
    } catch (error) {
      console.error('Error sending email:', error.message);
      // Handle error as needed, such as displaying an error message to the user
    }
  };

  const updatePassword = async (email, password) => {
    try {
      const response = await fetch('/api/auth/updatepassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to update password');
      }

      console.log('Password updated successfully');
    } catch (error) {
      console.error('Error updating password:', error.message);
      // Handle error as needed, such as displaying an error message to the user
    }
  };

  return (
    <SendEmailContext.Provider value={{ sendEmail,updatePassword, email, code }}>
      {children}
    </SendEmailContext.Provider>
  );
};
