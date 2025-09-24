import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { mockSkills, skillCategories, skillTypes, hourlyRateRanges, availabilityOptions } from '../data/mockSkills';
import SearchBar from '../components/ui/SearchBar';

export default function Skills() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedRateRange, setSelectedRateRange] = useState(hourlyRateRanges[0]);
  const [selectedAvailability, setSelectedAvailability] = useState('All Times');
  const [sortBy, setSortBy] = useState('newest');

  // Filter and sort skills
  const filteredSkills = useMemo(() => {
    return mockSkills
      .filter(skill => {
        const matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            skill.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            skill.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            skill.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesCategory = selectedCategory === 'All Categories' || 
                               skill.category === selectedCategory;
        
        const matchesType = selectedType === 'all' || skill.type === selectedType;
        
        const matchesRate = skill.hourlyRate >= selectedRateRange.min && 
                           skill.hourlyRate <= selectedRateRange.max;
        
        const matchesAvailability = selectedAvailability === 'All Times' ||
                                   skill.availability.toLowerCase().includes(selectedAvailability.toLowerCase());
        
        return matchesSearch && matchesCategory && matchesType && matchesRate && matchesAvailability;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'rate-low':
            return a.hourlyRate - b.hourlyRate;
          case 'rate-high':
            return b.hourlyRate - a.hourlyRate;
          case 'rating': {
            const aRating = a.tutor?.rating || a.student?.rating || 0;
            const bRating = b.tutor?.rating || b.student?.rating || 0;
            return bRating - aRating;
          }
          case 'newest':
            return new Date(b.postedDate) - new Date(a.postedDate);
          default:
            return 0;
        }
      });
  }, [searchTerm, selectedCategory, selectedType, selectedRateRange, selectedAvailability, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Categories');
    setSelectedType('all');
    setSelectedRateRange(hourlyRateRanges[0]);
    setSelectedAvailability('All Times');
  };

  const getPersonInfo = (skill) => {
    return skill.tutor || skill.student;
  };

  const getTypeIcon = (type) => {
    return type === 'offer' ? '🎓' : '🙋‍♂️';
  };

  const getTypeText = (type) => {
    return type === 'offer' ? 'Offering Tutoring' : 'Looking for Help';
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm shadow-lg border-b border-slate-200/60 dark:border-slate-700/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-2"
            >
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                🎓 Skills Exchange
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-lg">
                Connect with tutors and study partners
              </p>
              <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>{mockSkills.filter(s => s.type === 'offer').length} tutors available</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>{mockSkills.filter(s => s.type === 'request').length} students seeking help</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <Link
                to="/skills/offer"
                className="group relative inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <span className="mr-2 group-hover:rotate-12 transition-transform duration-300">🎓</span>
                <span>Offer Skills</span>
              </Link>
            </motion.div>
          </div>

          {/* Search Bar */}
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search skills, subjects, or tutors..."
            className="mt-6"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:w-80 flex-shrink-0"
          >
            <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-lg rounded-2xl border border-slate-200/60 dark:border-slate-700/60 p-6 shadow-xl sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-6">
                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                    Type
                  </label>
                  <div className="space-y-2">
                    {skillTypes.map((type) => (
                      <label key={type.value} className="flex items-center">
                        <input
                          type="radio"
                          name="type"
                          value={type.value}
                          checked={selectedType === type.value}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-slate-700 dark:text-slate-300">
                          {type.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-white/60 dark:bg-slate-700/60 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {skillCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rate Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                    Hourly Rate
                  </label>
                  <div className="space-y-2">
                    {hourlyRateRanges.map((range, index) => (
                      <label key={index} className="flex items-center">
                        <input
                          type="radio"
                          name="rate"
                          checked={selectedRateRange.label === range.label}
                          onChange={() => setSelectedRateRange(range)}
                          className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-slate-700 dark:text-slate-300">
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Availability Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                    Availability
                  </label>
                  <select
                    value={selectedAvailability}
                    onChange={(e) => setSelectedAvailability(e.target.value)}
                    className="w-full px-3 py-2 bg-white/60 dark:bg-slate-700/60 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {availabilityOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skills Grid */}
          <div className="flex-1">
            {/* Sort and Results */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <p className="text-slate-600 dark:text-slate-300">
                Showing {filteredSkills.length} of {mockSkills.length} skills
              </p>
              
              <div className="flex items-center gap-2">
                <label className="text-sm text-slate-600 dark:text-slate-300">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-white/60 dark:bg-slate-700/60 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="newest">Newest</option>
                  <option value="rating">Highest Rated</option>
                  <option value="rate-low">Rate: Low to High</option>
                  <option value="rate-high">Rate: High to Low</option>
                </select>
              </div>
            </div>

            {/* Skills Cards */}
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredSkills.map((skill) => {
                  const person = getPersonInfo(skill);
                  return (
                    <motion.div
                      key={skill.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ y: -5 }}
                      className="group relative bg-white/95 dark:bg-slate-800/95 backdrop-blur-lg rounded-2xl border border-slate-200/60 dark:border-slate-700/60 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                    >
                      <Link to={`/skills/${skill.id}`} className="block p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={person.avatar}
                              alt={person.name}
                              className="w-12 h-12 rounded-full object-cover border-2 border-white/50"
                            />
                            <div>
                              <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-1">
                                {person.name}
                              </h3>
                              <div className="flex items-center gap-1">
                                <span className="text-yellow-500">⭐</span>
                                <span className="text-sm text-slate-600 dark:text-slate-300">
                                  {person.rating}
                                </span>
                                {person.totalReviews && (
                                  <span className="text-sm text-slate-500 dark:text-slate-400">
                                    ({person.totalReviews})
                                  </span>
                                )}
                                {skill.verified && (
                                  <span className="text-blue-500 ml-1">✓</span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600 dark:text-green-400">
                              ${skill.hourlyRate}/hr
                            </div>
                            <div className={`text-xs px-2 py-1 rounded-full ${
                              skill.type === 'offer' 
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                            }`}>
                              {getTypeIcon(skill.type)} {getTypeText(skill.type)}
                            </div>
                          </div>
                        </div>

                        {/* Title and Category */}
                        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2">
                          {skill.title}
                        </h4>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-full">
                            {skill.category}
                          </span>
                          <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-full">
                            {skill.subject}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3">
                          {skill.description}
                        </p>

                        {/* Skills Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {skill.skills.slice(0, 3).map((skillTag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded"
                            >
                              {skillTag}
                            </span>
                          ))}
                          {skill.skills.length > 3 && (
                            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs rounded">
                              +{skill.skills.length - 3} more
                            </span>
                          )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                          <span>📍 {skill.location}</span>
                          <span>🕒 {skill.availability}</span>
                        </div>

                        {skill.responseTime && (
                          <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                            {skill.responseTime}
                          </div>
                        )}
                      </Link>

                      {/* Contact Section - Show for all skills */}
                      {skill.contact && (
                        <div className="px-6 pb-4">
                          <Link 
                            to={`/contact/${skill.id}`}
                            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group"
                          >
                            <span className="text-sm">📧</span>
                            <span>Contact {person.name}</span>
                            <span className="group-hover:translate-x-1 transition-transform">
                              →
                            </span>
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {/* No Results */}
            {filteredSkills.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  No skills found
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}