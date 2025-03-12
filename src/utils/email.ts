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

// In a real application, you would use a proper email service like Nodemailer, SendGrid, etc.
// This is a mock implementation for demonstration purposes

export interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    console.log('Sending email to:', options.to);
    
    // Create email transporter using the existing function that checks .env
    const transporter = await createTransporter();
    
    // Set the sender from environment or use a default
    const from = process.env.EMAIL_USER || 'noreply@volunteer-platform.com';
    
    // Send the email
    const info = await transporter.sendMail({
      from,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });
    
    // Log mail info
    console.log('Email sent:', info.messageId);
    
    // For development with Ethereal Email, log the preview URL
    if (!process.env.EMAIL_USER) {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

export function generateVerificationEmailContent(name: string, code: string): { subject: string; html: string } {
  const subject = 'Your Volunteer Application Has Been Approved';
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #00D9CF;">Your Volunteer Application Has Been Approved!</h2>
      <p>Dear ${name},</p>
      <p>We're pleased to inform you that your application to volunteer with us has been approved.</p>
      <p>To complete your registration, please use the following verification code when creating your account:</p>
      <div style="background-color: #f0f0f0; padding: 15px; margin: 20px 0; text-align: center; border-radius: 5px;">
        <span style="font-family: monospace; font-size: 24px; font-weight: bold;">${code}</span>
      </div>
      <p>This code will expire in 7 days. Please visit our website and click on "Register" to create your account.</p>
      <p>Thank you for your interest in volunteering with us. We look forward to working with you!</p>
      <p>Best regards,<br>The Volunteer Team</p>
    </div>
  `;
  
  return { subject, html };
} 