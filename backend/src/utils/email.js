import nodemailer from 'nodemailer';

/**
 * Create email transporter based on environment
 */
const createTransporter = () => {
  try {
    // Always use Gmail SMTP if credentials are provided
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD && process.env.EMAIL_PASSWORD !== 'your-gmail-app-password-here') {
      console.log('📧 Using Gmail SMTP for email delivery');
      return nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });
    }
    
    console.log('📧 Gmail credentials not configured, using Ethereal fallback');
    // Fallback - Ethereal (for development without real email)
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: process.env.ETHEREAL_USER || 'ethereal.user@ethereal.email',
        pass: process.env.ETHEREAL_PASS || 'ethereal.password'
      }
    });
  } catch (err) {
    console.error('Failed to create email transporter:', err.message);
    return null;
  }
};

/**
 * Send email utility function
 * @param {object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text content
 * @param {string} options.html - HTML content
 */
export const sendEmail = async (options) => {
  try {
  const transporter = createTransporter();
  if (!transporter) throw new Error('Email transporter not available');
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'College Marketplace <noreply@collegemarketplace.com>',
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent:', info.messageId);
    if (process.env.NODE_ENV !== 'production') {
      console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    }
    
    return info;
  } catch (error) {
    console.error('Email send error:', error);
    throw new Error('Failed to send email');
  }
};

/**
 * Send OTP verification email
 * @param {string} email - User email
 * @param {string} firstName - User first name
 * @param {string} otp - OTP code
 */
export const sendOTPEmail = async (email, firstName, otp) => {
  const subject = 'Verify Your Email - College Marketplace';
  const text = `
    Hi ${firstName},
    
    Your verification code is: ${otp}
    
    This code will expire in 10 minutes.
    
    If you didn't request this, please ignore this email.
    
    Best regards,
    College Marketplace Team
  `;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #333; text-align: center;">Email Verification</h2>
      <p>Hi ${firstName},</p>
      <p>Your verification code is:</p>
      <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
        <h1 style="color: #007bff; font-size: 32px; margin: 0; letter-spacing: 5px;">${otp}</h1>
      </div>
      <p style="color: #666; font-size: 14px;">This code will expire in 10 minutes.</p>
      <p style="color: #666; font-size: 14px;">If you didn't request this, please ignore this email.</p>
      <hr style="border: 1px solid #eee; margin: 30px 0;">
      <p style="color: #999; font-size: 12px; text-align: center;">
        Best regards,<br>
        College Marketplace Team
      </p>
    </div>
  `;
  
  await sendEmail({ to: email, subject, text, html });
};

/**
 * Send password reset OTP email
 * @param {string} email - User email
 * @param {string} firstName - User first name
 * @param {string} otp - Password reset OTP
 */
export const sendPasswordResetOTPEmail = async (email, firstName, otp) => {
  const subject = 'Password Reset OTP - College Marketplace';
  const text = `
    Hi ${firstName},
    
    You requested a password reset for your College Marketplace account.
    
    Your password reset verification code is: ${otp}
    
    This code will expire in 10 minutes.
    
    If you didn't request this, please ignore this email.
    
    Best regards,
    College Marketplace Team
  `;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #333; text-align: center;">Password Reset Verification</h2>
      <p>Hi ${firstName},</p>
      <p>You requested a password reset for your College Marketplace account.</p>
      <p>Your verification code is:</p>
      <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
        <h1 style="color: #dc3545; font-size: 32px; margin: 0; letter-spacing: 5px;">${otp}</h1>
      </div>
      <p style="color: #666; font-size: 14px;">This code will expire in 10 minutes.</p>
      <p style="color: #666; font-size: 14px;">If you didn't request this, please ignore this email.</p>
      <hr style="border: 1px solid #eee; margin: 30px 0;">
      <p style="color: #999; font-size: 12px; text-align: center;">
        Best regards,<br>
        College Marketplace Team
      </p>
    </div>
  `;
  
  await sendEmail({ to: email, subject, text, html });
};

/**
 * Send password reset email
 * @param {string} email - User email
 * @param {string} firstName - User first name
 * @param {string} resetUrl - Password reset URL
 */
export const sendPasswordResetEmail = async (email, firstName, resetUrl) => {
  const subject = 'Reset Your Password - College Marketplace';
  const text = `
    Hi ${firstName},
    
    You requested a password reset for your College Marketplace account.
    
    Click the following link to reset your password:
    ${resetUrl}
    
    This link will expire in 1 hour.
    
    If you didn't request this, please ignore this email.
    
    Best regards,
    College Marketplace Team
  `;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #333; text-align: center;">Password Reset</h2>
      <p>Hi ${firstName},</p>
      <p>You requested a password reset for your College Marketplace account.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" 
           style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Reset Password
        </a>
      </div>
      <p style="color: #666; font-size: 14px;">Or copy and paste this link in your browser:</p>
      <p style="background-color: #f8f9fa; padding: 10px; border-radius: 4px; word-break: break-all; font-size: 14px;">
        ${resetUrl}
      </p>
      <p style="color: #666; font-size: 14px;">This link will expire in 1 hour.</p>
      <p style="color: #666; font-size: 14px;">If you didn't request this, please ignore this email.</p>
      <hr style="border: 1px solid #eee; margin: 30px 0;">
      <p style="color: #999; font-size: 12px; text-align: center;">
        Best regards,<br>
        College Marketplace Team
      </p>
    </div>
  `;
  
  await sendEmail({ to: email, subject, text, html });
};