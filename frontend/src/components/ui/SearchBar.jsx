import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

// SearchBar component for search functionality with glassmorphism design
const SearchBar = ({ value, onChange, placeholder, onClear }) => {
  // Handle clear button click
  const handleClear = () => {
    if (onClear) {
      onClear();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-8 relative"
    >
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
          <span className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 text-xl z-10">🔍</span>
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full pl-14 pr-6 py-4 text-lg bg-transparent border-none outline-none focus:ring-0 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
          {value && (
            <button
              onClick={handleClear}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// PropTypes validation
SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  onClear: PropTypes.func,
};

// Default props
SearchBar.defaultProps = {
  placeholder: 'Search...',
  onClear: null,
};

export default SearchBar;