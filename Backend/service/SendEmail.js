const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator')

const subject = "Reset Password Code for Your Account";


const sendMail = async (recipient) => {
  const resetPasswordCode = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
  console.log(resetPasswordCode);
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service provider
    auth: {
      user: process.env.EMAIL_USER, // Your email address from environment variable
      pass: process.env.EMAIL_PASSWORD // Your email password from environment variable
    }
  });

  const text = `Dear User,

As per your recent request to reset your password, we're here to assist you in regaining access to your account. Below, you'll find the reset password code you'll need to proceed:

Reset Password Code: ${resetPasswordCode}

Please follow the steps below to reset your password:

1. Visit website.
2. Click on the "Forgot Password" link.
3. Follow the on-screen instructions to create a new password.

For security reasons, please ensure that you do not share this code with anyone else. If you did not request a password reset, please disregard this email.

Thank you for your attention to this matter.

Best regards,
iNotebook team`;

  const html = `<p>Dear User,</p>
<p>As per your recent request to reset your password, we're here to assist you in regaining access to your account. Below, you'll find the reset password code you'll need to proceed:</p>
<p><strong>Reset Password Code:</strong> ${resetPasswordCode}</p>
<p>Please follow the steps below to reset your password:</p>
<ol>
  <li>Visit website.</li>
  <li>Click on the "Forgot Password" link.</li>
  <li>Follow the on-screen instructions to create a new password.</li>
</ol>
<p>For security reasons, please ensure that you do not share this code with anyone else. If you did not request a password reset, please disregard this email.</p>
<p>Thank you for your attention to this matter.</p>
<p>Best regards,<br>
iNotebook team<br>`;

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: recipient, // Recipient address
    subject: subject, // Subject line
    text: text, // Plain text body
    html: html // HTML body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return { success: true, resetPasswordCode: resetPasswordCode };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error };
  }
};

module.exports = { sendMail };
