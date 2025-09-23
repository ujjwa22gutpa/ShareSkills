import { verifyToken, extractTokenFromHeader } from '../utils/jwt.js';
import User from '../models/User.js';
import { AppError } from '../utils/appError.js';

/**
 * Middleware to verify JWT token and authenticate user
 */
export const authenticate = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const token = extractTokenFromHeader(req.headers.authorization);
    
    if (!token) {
      return next(new AppError('Authentication token is required', 401));
    }

    // Verify token
    const decoded = verifyToken(token, 'access');
    
    // Find user by ID
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return next(new AppError('User not found', 401));
    }

    // Check if user is active
    if (!user.isActive) {
      return next(new AppError('Account is deactivated', 401));
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(new AppError('Invalid token', 401));
    }
    if (error.name === 'TokenExpiredError') {
      return next(new AppError('Token expired', 401));
    }
    next(error);
  }
};

/**
 * Middleware to check if user is verified
 */
export const requireVerification = (req, res, next) => {
  if (!req.user.isEmailVerified) {
    return next(new AppError('Email verification required', 403));
  }
  next();
};

/**
 * Middleware to check user roles (for future use)
 */
export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user.role || !roles.includes(req.user.role)) {
      return next(new AppError('Insufficient permissions', 403));
    }
    next();
  };
};

/**
 * Optional authentication - doesn't fail if no token provided
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);
    
    if (token) {
      const decoded = verifyToken(token, 'access');
      const user = await User.findById(decoded.userId).select('-password');
      
      if (user && user.isActive) {
        req.user = user;
      }
    }
    
    next();
  } catch (error) {
    // Continue without authentication if token is invalid
    next();
  }
};