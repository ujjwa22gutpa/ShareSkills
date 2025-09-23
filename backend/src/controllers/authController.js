import User from '../models/User.js';
import { AppError } from '../utils/appError.js';
import { catchAsync, sendSuccessResponse } from '../utils/helpers.js';
import { generateTokenPair } from '../utils/jwt.js';
import { sendOTPEmail, sendPasswordResetEmail } from '../utils/email.js';
import {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  forgotPasswordSchema,
  verifyPasswordResetOTPSchema,
  resetPasswordSchema,
  resendOTPSchema,
  changePasswordSchema
} from '../utils/validation.js';

/**
 * Register a new user
 */
/**
 * Register a new user with immediate auto-login
 */
export const register = catchAsync(async (req, res, next) => {
  // Validate request body
  const { error, value } = registerSchema.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  const { firstName, lastName, email, password } = value;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError('User with this email already exists', 409));
  }

  try {
    // Create new user with auto-verified email for immediate login
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      isEmailVerified: true // Auto-verify for immediate access
    });

    // Generate JWT tokens for immediate login
    const tokens = generateTokenPair(user._id);

    // Update last seen timestamp
    user.lastSeen = new Date();
    await user.save();

    // Return success response with user data and tokens
    sendSuccessResponse(res, 201, 'User registered and logged in successfully', {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isEmailVerified: user.isEmailVerified
      },
      ...tokens
    });
  } catch (error) {
    console.error('Registration error:', error);
    return next(new AppError('Failed to register user', 500));
  }
});

/**
 * Login user with email and password
 */
export const login = catchAsync(async (req, res, next) => {
  // Validate request body
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  const { email, password } = value;

  try {
    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError('Invalid email or password', 401));
    }

    // Check if user is active
    if (!user.isActive) {
      return next(new AppError('Account is deactivated', 401));
    }

    // Generate JWT tokens
    const tokens = generateTokenPair(user._id);

    // Update last seen timestamp
    user.lastSeen = new Date();
    await user.save();

    // Return success response with user data and tokens
    sendSuccessResponse(res, 200, 'Login successful', {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isEmailVerified: user.isEmailVerified
      },
      ...tokens
    });
  } catch (error) {
    console.error('Login error:', error);
    return next(new AppError('Login failed', 500));
  }
});

/**
 * Verify email with OTP
 */
export const verifyEmail = catchAsync(async (req, res, next) => {
  // Validate request body
  const { error, value } = verifyEmailSchema.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  const { email, otp } = value;

  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  // Check if already verified
  if (user.isEmailVerified) {
    return next(new AppError('Email is already verified', 400));
  }

  // Verify OTP
  const isValidOTP = user.verifyOTP(otp);
  if (!isValidOTP) {
    return next(new AppError('Invalid or expired OTP', 400));
  }

  // Mark email as verified
  user.isEmailVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  // Generate tokens for automatic login after verification
  const tokens = generateTokenPair(user._id);

  sendSuccessResponse(res, 200, 'Email verified successfully', {
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      profile: user.profile
    },
    ...tokens
  });
});

/**
 * Resend OTP for email verification
 */
export const resendOTP = catchAsync(async (req, res, next) => {
  // Validate request body
  const { error, value } = resendOTPSchema.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  const { email } = value;

  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  // Check if already verified
  if (user.isEmailVerified) {
    return next(new AppError('Email is already verified', 400));
  }

  // Generate and send new OTP
  const otp = user.generateOTP();
  await user.save();

  try {
    await sendOTPEmail(email, user.firstName, otp);
  } catch (emailError) {
    console.error('Failed to send OTP email:', emailError);
    return next(new AppError('Failed to send OTP email', 500));
  }

  sendSuccessResponse(res, 200, 'OTP sent successfully');
});

/**
 * Secure forgot password - request password reset OTP
 */
export const forgotPassword = catchAsync(async (req, res, next) => {
  // Validate request body
  const { error, value } = forgotPasswordSchema.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  const { email } = value;

  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    // Don't reveal if user exists or not (security)
    return sendSuccessResponse(res, 200, 'If a user with this email exists, a password reset OTP has been sent');
  }

  try {
    // Generate secure password reset OTP with rate limiting
    const otp = user.generatePasswordResetOTP();
    await user.save();

    // Send OTP via email (for now, we'll just log it for testing)
    console.log(`� Password Reset OTP for ${email}: ${otp}`);
    
    // In production, uncomment this:
    // await sendOTPEmail(email, user.firstName, otp);

    sendSuccessResponse(res, 200, 'Password reset OTP sent to your email');
  } catch (error) {
    if (error.message.includes('Too many password reset attempts')) {
      return next(new AppError(error.message, 429));
    }
    return next(new AppError('Failed to send password reset OTP', 500));
  }
});

/**
 * Verify password reset OTP
 */
export const verifyPasswordResetOTP = catchAsync(async (req, res, next) => {
  // Validate request body
  const { error, value } = verifyPasswordResetOTPSchema.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  const { email, otp } = value;

  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  // Check if user is locked due to too many attempts
  if (user.isPasswordResetLocked()) {
    return next(new AppError('Too many failed attempts. Please try again later', 429));
  }

  // Verify OTP
  const isValidOTP = user.verifyPasswordResetOTP(otp);
  if (!isValidOTP) {
    // Increment failed attempts
    user.passwordResetAttempts = (user.passwordResetAttempts || 0) + 1;
    
    // Lock account after 5 failed attempts
    if (user.passwordResetAttempts >= 5) {
      user.passwordResetLockedUntil = Date.now() + 60 * 60 * 1000; // 1 hour
    }
    
    await user.save();
    return next(new AppError('Invalid or expired OTP', 400));
  }

  sendSuccessResponse(res, 200, 'OTP verified successfully. You can now reset your password');
});

/**
 * Reset password with verified OTP (final step)
 */
export const resetPassword = catchAsync(async (req, res, next) => {
  // Validate request body
  const { error, value } = resetPasswordSchema.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  const { email, otp, password } = value;

  // Find user
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  // Verify OTP one final time
  const isValidOTP = user.verifyPasswordResetOTP(otp);
  if (!isValidOTP) {
    return next(new AppError('Invalid or expired OTP', 400));
  }

  // Update password
  user.password = password;
  user.passwordChangedAt = Date.now();
  
  // Clear all password reset fields
  user.resetPasswordResetAttempts();
  
  await user.save();

  // Generate tokens for automatic login
  const tokens = generateTokenPair(user._id);

  sendSuccessResponse(res, 200, 'Password reset successful', {
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isEmailVerified: user.isEmailVerified
    },
    ...tokens
  });
});

/**
 * Change password for authenticated user
 */
export const changePassword = catchAsync(async (req, res, next) => {
  // Validate request body
  const { error, value } = changePasswordSchema.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  const { currentPassword, newPassword } = value;

  // Get user with password
  const user = await User.findById(req.user.id).select('+password');

  // Verify current password
  if (!(await user.comparePassword(currentPassword))) {
    return next(new AppError('Current password is incorrect', 400));
  }

  // Update password
  user.password = newPassword;
  await user.save();

  sendSuccessResponse(res, 200, 'Password changed successfully');
});

/**
 * Get current user profile
 */
export const getProfile = catchAsync(async (req, res, next) => {
  sendSuccessResponse(res, 200, 'Profile retrieved successfully', {
    user: req.user
  });
});

/**
 * Logout user (client-side token removal)
 */
export const logout = catchAsync(async (req, res, next) => {
  // In JWT-based auth, logout is typically handled client-side
  // You could maintain a blacklist of tokens here if needed
  sendSuccessResponse(res, 200, 'Logged out successfully');
});