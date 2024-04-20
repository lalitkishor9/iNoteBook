import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {useSendEmail} from '../context/user/resetPass'

function ResetPass() {
    const [emailInput, setEmailInput] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [verificationComplete, setVerificationComplete] = useState(false);
    const { sendEmail,updatePassword, email, code } = useSendEmail();
    let history = useNavigate();

  const handleSendCode = async(e) => {
    e.preventDefault();
    console.log(email);
    try {
        await sendEmail(emailInput);
        console.log('Email sent successfully');
      } catch (error) {
        console.error('Error sending email:', error.message);
      }
    // You can make an API call here to send the code to the provided email
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    // Implement code verification logic here
    if(verificationCode === code){
        setVerificationComplete(true);
    } else {
        console.error('Verification code is incorrect');
      }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await updatePassword(email, newPassword);
      history('/login');
      console.log('Password changed successfully');
    } catch (error) {
      console.error('Error changing password:', error.message);
    }
  };  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card text-center" style={{ width: '25rem' }}>
        <div className="card-body">
          <h5 className="card-title">Reset Password</h5>
          {!verificationComplete && (
            <form>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
                <small id="emailHelp" className="form-text text-muted">We'll send a reset code to your email.</small>
              </div>
              <button type="submit" className="btn btn-primary btn-block" onClick={handleSendCode}>Send Code</button>
              {email && <p>Code sent to: {email}</p>}
              <div className="form-group mt-3">
                <label htmlFor="code">Enter Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="code"
                  placeholder="Enter code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block" onClick={handleVerifyCode}>Verify Code</button>
            </form>
          )}
          {verificationComplete && (
            <form>
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block" onClick={handleChangePassword}>Change Password</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResetPass;
