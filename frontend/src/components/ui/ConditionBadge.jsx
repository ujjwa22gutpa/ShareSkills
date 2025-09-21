import React from 'react';
import PropTypes from 'prop-types';

// ConditionBadge component for displaying book condition with color-coded styling
const ConditionBadge = ({ condition }) => {
  // Color mapping function for different book conditions
  const getConditionColor = (condition) => {
    const colors = {
      'Like New': 'from-emerald-500 to-green-500',
      'Very Good': 'from-blue-500 to-indigo-500',
      'Good': 'from-amber-500 to-orange-500',
      'Fair': 'from-gray-500 to-slate-500'
    };
    return colors[condition] || 'from-gray-500 to-slate-500';
  };

  return (
    <span 
      className={`px-3 py-1 text-xs font-bold text-white rounded-full bg-gradient-to-r ${getConditionColor(condition)} shadow-lg`}
    >
      {condition}
    </span>
  );
};

// PropTypes validation
ConditionBadge.propTypes = {
  condition: PropTypes.string.isRequired,
};

export default ConditionBadge;