import nodemailer from 'nodemailer';

// Configure email transporter
export const createTransporter = async () => {
  // Check if email credentials are provided in .env
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    // Use Gmail SMTP with credentials from .env
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  
  // Fallback to test account if no email credentials are provided
  const testAccount = await nodemailer.createTestAccount();
  
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
};

// Send password reset email
export const sendPasswordResetEmail = async (
  email: string, 
  resetToken: string,
  baseUrl: string
) => {
  const transporter = await createTransporter();
  
  const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;
  
  const mailOptions = {
    from: process.env.EMAIL_USER || 'noreply@volunteer-platform.com',
    to: email,
    subject: 'Password Reset Request',
    html: `
      <h1>Password Reset Request</h1>
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>If you didn't request this, please ignore this email.</p>
      <p>This link will expire in 1 hour.</p>
    `,
  };
  
  const info = await transporter.sendMail(mailOptions);
  
  // For development with Ethereal Email, log the preview URL
  if (!process.env.EMAIL_USER) {
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
  
  return info;
}; 