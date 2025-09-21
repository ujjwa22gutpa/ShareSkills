// /src/components/layout/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useThemeStore, useAuthStore } from '../../main';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({ books: false, skills: false });
  const navRef = useRef(null);
  const location = useLocation();
  const dark = useThemeStore((s) => s.dark);
  const toggle = useThemeStore((s) => s.toggle);
  const { isAuthenticated, user, logout } = useAuthStore();

  const isActive = (path) => location.pathname === path;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setDropdownOpen({ books: false, skills: false });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
    { label: 'Home', path: '/' },
    { 
      label: 'Books', 
      path: '/books',
      dropdown: [
        { label: 'Browse Books', path: '/books' },
        { label: 'Add Book', path: '/books/add' }
      ]
    },
    { 
      label: 'Skills', 
      path: '/skills',
      dropdown: [
        { label: 'Browse Skills', path: '/skills' },
        { label: 'Offer Skills', path: '/skills/offer' }
      ]
    },
    { label: 'About', path: '/about' },
  ];

  const toggleDropdown = (key) => {
    setDropdownOpen(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false); // Close mobile menu if open
    alert('You have been logged out successfully.');
  };

  return (
    <nav ref={navRef} className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50 shadow-lg shadow-gray-200/20 dark:shadow-gray-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <motion.div
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:via-blue-600 group-hover:to-purple-800 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📚 Campus Market
              </motion.div>
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1 px-8">
            <div className="flex items-center space-x-8 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full px-6 py-2 border border-gray-200/30 dark:border-gray-700/30">
              {navItems.map((item) => (
                <div key={item.path} className="relative">
                  {item.dropdown ? (
                    <div>
                      <motion.button
                        onClick={() => toggleDropdown(item.label.toLowerCase())}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          isActive(item.path)
                            ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg'
                            : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/60 dark:hover:bg-gray-700/60'
                        }`}
                      >
                        {item.label}
                        <motion.svg 
                          className="ml-1 w-4 h-4"
                          animate={{ rotate: dropdownOpen[item.label.toLowerCase()] ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </motion.button>
                      
                      {/* Dropdown Menu */}
                      {dropdownOpen[item.label.toLowerCase()] && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-3 w-52 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 py-2 z-50 overflow-hidden"
                        >
                          {item.dropdown.map((subItem, index) => (
                            <motion.div
                              key={subItem.path}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <Link
                                to={subItem.path}
                                onClick={() => setDropdownOpen({ books: false, skills: false })}
                                className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 mx-2 rounded-lg"
                              >
                                <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3"></span>
                                {subItem.label}
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to={item.path}
                        className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          isActive(item.path)
                            ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg'
                            : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/60 dark:hover:bg-gray-700/60'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Theme toggle and auth */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggle}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-2.5 rounded-full bg-gradient-to-r from-amber-200 to-orange-300 dark:from-indigo-600 dark:to-purple-600 hover:from-amber-300 hover:to-orange-400 dark:hover:from-indigo-500 dark:hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl"
              aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}
            >
              <motion.div
                animate={{ rotate: dark ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                {dark ? (
                  <svg className="w-5 h-5 text-amber-100" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-indigo-100" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </motion.div>
            </motion.button>

            {/* Auth buttons */}
            <div className="hidden md:flex items-center space-x-3">
              {isAuthenticated ? (
                // Logout button when authenticated
                <div className="flex items-center space-x-4">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-600"
                  >
                    <span className="text-blue-600 dark:text-blue-400">👋</span> {user?.name}
                  </motion.div>
                  <motion.button
                    onClick={handleLogout}
                    whileHover={{ 
                      scale: 1.05,
                      rotateX: 10,
                      rotateY: 5,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ 
                      scale: 0.95,
                      rotateX: -5,
                      rotateY: -5 
                    }}
                    className="relative group px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-red-500 via-pink-500 to-red-600 hover:from-red-600 hover:via-pink-600 hover:to-red-700 rounded-full transition-all duration-300 transform-gpu shadow-lg hover:shadow-xl overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-pink-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center">
                      <motion.svg 
                        className="w-4 h-4 mr-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </motion.svg>
                      Logout
                    </span>
                    <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"></div>
                  </motion.button>
                </div>
              ) : (
                // Login/Signup buttons when not authenticated
                <div className="flex items-center space-x-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/login"
                      className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Login
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/signup"
                      className="relative group px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
                    >
                      <span className="relative z-10">Sign Up</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"></div>
                    </Link>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2.5 rounded-full bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-all duration-200 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              <motion.svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </motion.svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200/50 dark:border-gray-700/50 pt-4 pb-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-b-xl mt-2 mx-2"
          >
            <div className="space-y-2">
              {navItems.map((item) => (
                <div key={item.path}>
                  {item.dropdown ? (
                    <div>
                      <motion.button
                        onClick={() => toggleDropdown(item.label.toLowerCase())}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200"
                      >
                        {item.label}
                        <motion.svg 
                          className="w-4 h-4"
                          animate={{ rotate: dropdownOpen[item.label.toLowerCase()] ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </motion.button>
                      
                      {dropdownOpen[item.label.toLowerCase()] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4 space-y-1 mt-2"
                        >
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              onClick={() => {
                                setIsOpen(false);
                                setDropdownOpen({ books: false, skills: false });
                              }}
                              className="flex items-center px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                            >
                              <span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3"></span>
                              {subItem.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                          isActive(item.path)
                            ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg'
                            : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  )}
                </div>
              ))}
              
              <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-4 mt-4 space-y-2">
                {isAuthenticated ? (
                  // Mobile logout section when authenticated
                  <div className="space-y-3">
                    <div className="px-4 py-2 text-center bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        <span className="text-blue-600 dark:text-blue-400">👋</span> Welcome, {user?.name}!
                      </p>
                    </div>
                    <motion.button
                      onClick={handleLogout}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-4 py-3 text-base font-medium text-white bg-gradient-to-r from-red-500 via-pink-500 to-red-600 hover:from-red-600 hover:via-pink-600 hover:to-red-700 rounded-lg transition-all duration-200 text-center flex items-center justify-center shadow-lg"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </motion.button>
                  </div>
                ) : (
                  // Mobile login/signup when not authenticated
                  <div className="space-y-2">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200 text-center"
                      >
                        Login
                      </Link>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to="/signup"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-3 text-base font-medium bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 transition-all duration-200 text-center shadow-lg"
                      >
                        Sign Up
                      </Link>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
