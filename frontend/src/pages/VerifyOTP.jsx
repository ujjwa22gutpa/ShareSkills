import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, CheckCircle, AlertCircle, RotateCcw, Send } from 'lucide-react';
import { authService } from '../services/authService';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [canResend, setCanResend] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const inputRefs = useRef([]);

  const email = localStorage.getItem('resetEmail');
  
  console.log('🔍 VerifyOTP: Component mounted, checking for resetEmail...');
  console.log('🔍 VerifyOTP: resetEmail from localStorage:', email);

  useEffect(() => {
    console.log('🔍 VerifyOTP: useEffect triggered, email value:', email);
    
    // Redirect if no email found
    if (!email) {
      console.log('❌ VerifyOTP: No email found, redirecting to forgot-password');
      navigate('/forgot-password');
      return;
    }
    
    console.log('✅ VerifyOTP: Email found, proceeding with OTP verification setup');

    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [email, navigate]);

  const handleInputChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (value && index === 5 && newOtp.every(digit => digit !== '')) {
      setTimeout(() => handleVerifyOTP(newOtp), 100);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = Array(6).fill('');
    for (let i = 0; i < Math.min(pasteData.length, 6); i++) {
      newOtp[i] = pasteData[i];
    }
    setOtp(newOtp);
    setError('');

    // Focus last filled input or next empty
    const lastIndex = Math.min(pasteData.length - 1, 5);
    inputRefs.current[lastIndex]?.focus();

    // Auto-submit if complete
    if (pasteData.length === 6) {
      setTimeout(() => handleVerifyOTP(newOtp), 100);
    }
  };

  const handleVerifyOTP = async (otpToVerify = otp) => {
    if (otpToVerify.some(digit => !digit)) {
      setError('Please enter all 6 digits');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Verify OTP using real backend API
      const enteredOTP = otpToVerify.join('');
      
      const response = await authService.verifyResetOTP({
        email: email,
        otp: enteredOTP
      });
      
      setSuccess(true);
      // Store verification status and OTP for password reset
      localStorage.setItem('otpVerified', 'true');
      localStorage.setItem('verifiedOTP', enteredOTP);
      
      // Navigate to reset password after success animation
      setTimeout(() => {
        navigate('/reset-password');
      }, 1500);
      
    } catch (error) {
      const errorMessage = error.message || 'Invalid OTP. Please try again.';
      setError(errorMessage);
      // Clear OTP inputs on error
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    setError('');
    setOtp(['', '', '', '', '', '']);

    try {
      // Resend OTP using real backend API
      await authService.forgotPassword(email);
      
      // Reset timer
      setTimeLeft(120);
      setCanResend(false);
      
      // Show success message
      setError(''); // Clear any previous errors
      inputRefs.current[0]?.focus();
      
    } catch (error) {
      const errorMessage = error.message || 'Failed to resend OTP. Please try again.';
      setError(errorMessage);
    } finally {
      setResendLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm text-center"
        >
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Verification Successful!
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Redirecting to password reset...
          </p>
        </motion.div>
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
            <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Verify OTP
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Enter the 6-digit code sent to
          </p>
          <p className="text-blue-600 dark:text-blue-400 font-medium">
            {email}
          </p>
        </div>

        {/* OTP Input Fields */}
        <div className="mb-6">
          <div className="flex justify-center space-x-3 mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-lg bg-white dark:bg-gray-700 transition-colors duration-200 ${
                  digit
                    ? 'border-blue-500 dark:border-blue-400 text-gray-900 dark:text-white'
                    : 'border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                disabled={loading}
              />
            ))}
          </div>

          {error && (
            <div className="flex items-center justify-center space-x-2 text-red-600 dark:text-red-400 text-sm">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Timer and Resend */}
        <div className="text-center mb-6">
          {!canResend ? (
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Resend code in{' '}
              <span className="font-mono font-medium text-blue-600 dark:text-blue-400">
                {formatTime(timeLeft)}
              </span>
            </p>
          ) : (
            <button
              onClick={handleResendOTP}
              disabled={resendLoading}
              className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors disabled:opacity-50"
            >
              {resendLoading ? (
                <>
                  <RotateCcw size={16} className="animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>Resend OTP</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Verify Button */}
        <button
          onClick={() => handleVerifyOTP()}
          disabled={loading || otp.some(digit => !digit)}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Verifying...</span>
            </>
          ) : (
            <>
              <CheckCircle size={20} />
              <span>Verify OTP</span>
            </>
          )}
        </button>

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

        {/* Development Note */}
        <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
          <p className="text-xs text-blue-700 dark:text-blue-300 text-center">
            🔐 For demo: Use OTP <span className="font-mono font-bold">123456</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyOTP;