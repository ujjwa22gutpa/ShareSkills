import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  // Basic user information (from frontend signup form)
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minlength: [2, 'First name must be at least 2 characters'],
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    minlength: [2, 'Last name must be at least 2 characters'],
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't include password in queries by default
  },

  // User profile information
  avatar: {
    type: String,
    default: null
  },
  university: {
    type: String,
    trim: true,
    maxlength: [100, 'University name cannot exceed 100 characters']
  },
  major: {
    type: String,
    trim: true,
    maxlength: [100, 'Major cannot exceed 100 characters']
  },
  graduationYear: {
    type: Number,
    min: [2020, 'Graduation year must be valid'],
    max: [2030, 'Graduation year must be valid']
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters']
  },

  // User status and verification
  isEmailVerified: {
    type: Boolean,
    default: true // Auto-verify emails for immediate login after registration
  },
  isActive: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },

  // Rating system (for books/skills marketplace)
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0,
    min: 0
  },

  // Password reset functionality (secure single approach)
  passwordResetOTP: String,
  passwordResetOTPExpires: Date,
  passwordResetAttempts: {
    type: Number,
    default: 0
  },
  passwordResetLockedUntil: Date,
  passwordChangedAt: Date,

  // Email verification (separate from password reset)
  otp: String,
  otpExpires: Date,

  // Last activity
  lastSeen: {
    type: Date,
    default: Date.now
  },

  // Saved/bookmarked items
  savedBooks: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Book'
  }],
  savedSkills: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Skill'
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance (email index is created by unique: true)
userSchema.index({ firstName: 1, lastName: 1 });
userSchema.index({ university: 1 });
userSchema.index({ isActive: 1, isEmailVerified: 1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for user's books
userSchema.virtual('books', {
  ref: 'Book',
  localField: '_id',
  foreignField: 'seller'
});

// Virtual for user's skills
userSchema.virtual('skills', {
  ref: 'Skill',
  localField: '_id',
  foreignField: 'user'
});

// Middleware to hash password before saving
userSchema.pre('save', async function(next) {
  // Only run if password was modified
  if (!this.isModified('password')) return next();

  // Hash password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  
  // Set passwordChangedAt for new users
  if (this.isNew) {
    this.passwordChangedAt = Date.now() - 1000; // Subtract 1 second to ensure JWT is created after
  }
  
  next();
});

// Middleware to update lastSeen on login
userSchema.pre(/^find/, function(next) {
  // this points to the current query
  this.find({ isActive: { $ne: false } });
  next();
});

// Instance method to check password
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Alias for comparePassword (used in login controller)
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method to check if password changed after JWT was issued
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  
  // False means NOT changed
  return false;
};

// Instance method to generate JWT token
userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { 
      id: this._id,
      email: this.email,
      role: this.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

// Instance method to generate OTP (for email verification only)
userSchema.methods.generateOTP = function() {
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  
  this.otp = otp;
  this.otpExpires = Date.now() + parseInt(process.env.OTP_EXPIRE_TIME || '10') * 60 * 1000; // 10 minutes default
  
  return otp;
};

// Instance method to verify email OTP
userSchema.methods.verifyOTP = function(providedOTP) {
  return this.otp === providedOTP && this.otpExpires > Date.now();
};

// Secure password reset methods
userSchema.methods.generatePasswordResetOTP = function() {
  // Check if user is locked due to too many attempts
  if (this.isPasswordResetLocked()) {
    throw new Error('Too many password reset attempts. Please try again later.');
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  
  this.passwordResetOTP = otp;
  this.passwordResetOTPExpires = Date.now() + 15 * 60 * 1000; // 15 minutes for security
  this.passwordResetAttempts = (this.passwordResetAttempts || 0) + 1;
  
  // Lock account after 5 failed attempts for 1 hour
  if (this.passwordResetAttempts >= 5) {
    this.passwordResetLockedUntil = Date.now() + 60 * 60 * 1000; // 1 hour
  }
  
  return otp;
};

userSchema.methods.verifyPasswordResetOTP = function(providedOTP) {
  // Check if account is locked
  if (this.isPasswordResetLocked()) {
    return false;
  }
  
  // Check if OTP is valid and not expired
  if (this.passwordResetOTP === providedOTP && this.passwordResetOTPExpires > Date.now()) {
    return true;
  }
  
  return false;
};

userSchema.methods.isPasswordResetLocked = function() {
  return this.passwordResetLockedUntil && this.passwordResetLockedUntil > Date.now();
};

userSchema.methods.resetPasswordResetAttempts = function() {
  this.passwordResetAttempts = 0;
  this.passwordResetLockedUntil = undefined;
  this.passwordResetOTP = undefined;
  this.passwordResetOTPExpires = undefined;
};

// Static method to get user stats
userSchema.statics.getUserStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        totalUsers: { $sum: 1 },
        verifiedUsers: {
          $sum: { $cond: [{ $eq: ['$isVerified', true] }, 1, 0] }
        },
        activeUsers: {
          $sum: { $cond: [{ $eq: ['$isActive', true] }, 1, 0] }
        },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);
  
  return stats[0];
};

const User = mongoose.model('User', userSchema);

export default User;