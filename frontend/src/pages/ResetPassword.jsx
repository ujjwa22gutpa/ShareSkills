import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Key, Eye, EyeOff, CheckCircle, AlertCircle, Lock, Shield } from 'lucide-react';
import { authService } from '../services/authService';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [checks, setChecks] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false
  });

  const email = localStorage.getItem('resetEmail');
  const otpVerified = localStorage.getItem('otpVerified');
  const verifiedOTP = localStorage.getItem('verifiedOTP');

  useEffect(() => {
    // Redirect if not coming from proper flow
    if (!email || !otpVerified || !verifiedOTP) {
      navigate('/forgot-password');
      return;
    }
  }, [email, otpVerified, verifiedOTP, navigate]);

  // Password strength checker
  const checkPasswordStrength = (password) => {
    let strength = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    strength = Object.values(checks).filter(Boolean).length;
    return { strength, checks };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Update password strength for password field
    if (name === 'password') {
      const { strength, checks: passwordChecks } = checkPasswordStrength(value);
      setPasswordStrength(strength);
      setChecks(passwordChecks);
    }

    // Clear confirm password error when passwords start matching
    if (name === 'confirmPassword' && errors.confirmPassword) {
      if (value === formData.password) {
        setErrors(prev => ({
          ...prev,
          confirmPassword: ''
        }));
      }
    }
  };

  const validateForm = () => {
    console.log('🔍 ResetPassword: Validating form...');
    console.log('🔍 ResetPassword: formData.password:', `"${formData.password}"`);
    console.log('🔍 ResetPassword: formData.confirmPassword:', `"${formData.confirmPassword}"`);
    
    const newErrors = {};
    const { strength, checks: passwordChecks } = checkPasswordStrength(formData.password);

    console.log('🔍 ResetPassword: Password strength:', strength);
    console.log('🔍 ResetPassword: Password checks:', passwordChecks);

    // Password validation
    if (!formData.password) {
      console.log('❌ ResetPassword: Password is empty');
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      console.log('❌ ResetPassword: Password too short');
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (strength < 3) {
      console.log('❌ ResetPassword: Password too weak');
      newErrors.password = 'Password is too weak. Include uppercase, lowercase, numbers, and special characters';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      console.log('❌ ResetPassword: Confirm password is empty');
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      console.log('❌ ResetPassword: Passwords do not match');
      newErrors.confirmPassword = 'Passwords do not match';
    }

    console.log('🔍 ResetPassword: Validation errors:', newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('🔄 ResetPassword: Form submitted');
    console.log('🔄 ResetPassword: Current formData:', formData);
    console.log('🔄 ResetPassword: Password length:', formData.password.length);
    console.log('🔄 ResetPassword: Confirm password length:', formData.confirmPassword.length);
    
    if (!validateForm()) {
      console.log('❌ ResetPassword: Validation failed');
      console.log('❌ ResetPassword: Current errors:', errors);
      return;
    }
    
    console.log('✅ ResetPassword: Validation passed, proceeding with API call');

    setLoading(true);

    try {
      // Reset password using real backend API
      const response = await authService.resetPassword({
        email: email,
        otp: verifiedOTP,
        password: formData.password
      });
      
      setSuccess(true);
      
      // Clean up localStorage
      localStorage.removeItem('resetEmail');
      localStorage.removeItem('otpVerified');
      localStorage.removeItem('verifiedOTP');
      
      // Navigate to login after success animation
      setTimeout(() => {
        navigate('/login', { 
          state: { 
            message: 'Password reset successful! Please login with your new password.' 
          }
        });
      }, 2500);
      
    } catch (error) {
      const errorMessage = error.message || 'Failed to reset password. Please try again.';
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const getStrengthColor = (strength) => {
    switch (strength) {
      case 0:
      case 1: return 'bg-red-500';
      case 2: return 'bg-orange-500';
      case 3: return 'bg-yellow-500';
      case 4: return 'bg-blue-500';
      case 5: return 'bg-green-500';
      default: return 'bg-gray-300';
    }
  };

  const getStrengthText = (strength) => {
    switch (strength) {
      case 0:
      case 1: return 'Very Weak';
      case 2: return 'Weak';
      case 3: return 'Fair';
      case 4: return 'Good';
      case 5: return 'Strong';
      default: return '';
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Password Reset Complete!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Your password has been successfully updated.
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Redirecting to login page...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-6">
            <Key className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Reset Password
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Create a new secure password for your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your new password"
                className={`w-full pl-10 pr-12 py-3 bg-white dark:bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${
                  errors.password
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-transparent'
                } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-2">
                <div className="flex space-x-1 mb-2">
                  {[...Array(5)].map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 flex-1 rounded-full transition-all duration-200 ${
                        index < passwordStrength ? getStrengthColor(passwordStrength) : 'bg-gray-200 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <p className={`text-xs ${
                  passwordStrength < 3 ? 'text-red-600 dark:text-red-400' : 
                  passwordStrength < 5 ? 'text-yellow-600 dark:text-yellow-400' : 
                  'text-green-600 dark:text-green-400'
                }`}>
                  Strength: {getStrengthText(passwordStrength)}
                </p>
                
                {/* Password Requirements */}
                <div className="mt-2 space-y-1">
                  {[
                    { key: 'length', text: 'At least 8 characters' },
                    { key: 'lowercase', text: 'One lowercase letter' },
                    { key: 'uppercase', text: 'One uppercase letter' },
                    { key: 'number', text: 'One number' },
                    { key: 'special', text: 'One special character' }
                  ].map(({ key, text }) => (
                    <div key={key} className="flex items-center space-x-2">
                      <div className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        checks[key] ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`} />
                      <span className={`text-xs ${
                        checks[key] ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {errors.password && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-2 flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm"
              >
                <AlertCircle size={16} />
                <span>{errors.password}</span>
              </motion.div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your new password"
                className={`w-full pl-10 pr-12 py-3 bg-white dark:bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${
                  errors.confirmPassword
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-transparent'
                } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            {errors.confirmPassword && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-2 flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm"
              >
                <AlertCircle size={16} />
                <span>{errors.confirmPassword}</span>
              </motion.div>
            )}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm"
            >
              <AlertCircle size={16} />
              <span>{errors.submit}</span>
            </motion.div>
          )}

          {/* Reset Password Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Resetting Password...</span>
              </>
            ) : (
              <>
                <Key size={20} />
                <span>Reset Password</span>
              </>
            )}
          </button>
        </form>

        {/* Back to Login */}
        <div className="text-center mt-6">
          <Link
            to="/login"
            className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            <span>Back to Login</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;