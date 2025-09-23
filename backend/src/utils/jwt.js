import jwt from 'jsonwebtoken';

/**
 * Generate JWT token for user authentication
 * @param {string} userId - User ID to encode in token
 * @param {string} type - Token type ('access' or 'refresh')
 * @returns {string} JWT token
 */
export const generateToken = (userId, type = 'access') => {
  const payload = { userId, type };
  const secret = type === 'access' 
    ? process.env.JWT_ACCESS_SECRET 
    : process.env.JWT_REFRESH_SECRET;
  
  const expiresIn = type === 'access' 
    ? process.env.JWT_ACCESS_EXPIRES_IN || '15m'
    : process.env.JWT_REFRESH_EXPIRES_IN || '7d';

  return jwt.sign(payload, secret, { expiresIn });
};

/**
 * Verify JWT token
 * @param {string} token - JWT token to verify
 * @param {string} type - Token type ('access' or 'refresh')
 * @returns {object} Decoded token payload
 */
export const verifyToken = (token, type = 'access') => {
  const secret = type === 'access' 
    ? process.env.JWT_ACCESS_SECRET 
    : process.env.JWT_REFRESH_SECRET;
  
  return jwt.verify(token, secret);
};

/**
 * Generate token pair (access + refresh)
 * @param {string} userId - User ID
 * @returns {object} Object containing access and refresh tokens
 */
export const generateTokenPair = (userId) => {
  return {
    accessToken: generateToken(userId, 'access'),
    refreshToken: generateToken(userId, 'refresh')
  };
};

/**
 * Extract token from Authorization header
 * @param {string} authHeader - Authorization header value
 * @returns {string|null} Extracted token or null
 */
export const extractTokenFromHeader = (authHeader) => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
};