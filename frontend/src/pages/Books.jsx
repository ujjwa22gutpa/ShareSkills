import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { mockBooks, categories, conditions, priceRanges } from '../data/mockBooks';
import ConditionBadge from '../components/ui/ConditionBadge';
import SearchBar from '../components/ui/SearchBar';

export default function Books() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedCondition, setSelectedCondition] = useState('All Conditions');
  const [affordableOnly, setAffordableOnly] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  // Filter and sort books
  const filteredBooks = useMemo(() => {
    return mockBooks
      .filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = selectedCategory === 'All Categories' || 
                               book.category === selectedCategory;
        
        const matchesCondition = selectedCondition === 'All Conditions' ||
                                book.condition === selectedCondition;
        
        const matchesPrice = !affordableOnly || book.price <= 100;
        
        return matchesSearch && matchesCategory && matchesCondition && matchesPrice;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'newest':
            return new Date(b.postedDate) - new Date(a.postedDate);
          default:
            return new Date(b.postedDate) - new Date(a.postedDate);
        }
      });
  }, [searchTerm, selectedCategory, selectedCondition, affordableOnly, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Categories');
    setSelectedCondition('All Conditions');
    setAffordableOnly(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Enhanced Header */}
      <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm shadow-lg border-b border-slate-200/60 dark:border-slate-700/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                  📚 Find Your Textbooks
                </h1>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium rounded-full">
                  Trusted
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                Buy and sell textbooks with fellow students. Save money, help others, and reduce waste.
              </p>
              
              {/* Clear Benefits for New Users */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400 font-semibold">💰</span>
                  </div>
                  <div>
                    <div className="font-medium">Save Up to 70%</div>
                    <div className="text-xs text-slate-500">vs. bookstore prices</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">🤝</span>
                  </div>
                  <div>
                    <div className="font-medium">Student to Student</div>
                    <div className="text-xs text-slate-500">Direct from your peers</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 dark:text-purple-400 font-semibold">✅</span>
                  </div>
                  <div>
                    <div className="font-medium">Safe & Simple</div>
                    <div className="text-xs text-slate-500">{mockBooks.length} verified listings</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
            >
              <div className="text-center sm:text-right">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                  New here? Start by browsing books below, or
                </p>
                <Link
                  to="/books/add"
                  className="group relative inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <span className="mr-2">📚</span>
                  <span>Sell Your Books</span>
                  <span className="ml-2 text-xs bg-blue-500 px-2 py-1 rounded-full">Easy!</span>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Simple Search Section */}
          <div className="mt-6 space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">🔍 Find Your Books</h3>
              <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                Try: "Chemistry" or "Calculus"
              </span>
            </div>
            <SearchBar
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search book titles (e.g., 'Calculus', 'Chemistry', 'Psychology')..."
              onClear={() => setSearchTerm('')}
            />
          </div>

          {/* Simple Filter Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4 bg-white dark:bg-slate-800 rounded-xl p-4 shadow-md border border-slate-200 dark:border-slate-600"
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Subject:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Condition Filter */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Condition:</span>
                <select
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {conditions.map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
              </div>

              {/* Price Filter */}
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={affordableOnly}
                    onChange={(e) => setAffordableOnly(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-2 border-slate-300 dark:border-slate-500 rounded focus:ring-blue-500"
                  />
                  Under $100
                </label>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2 lg:ml-auto">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="newest">🆕 Newest First</option>
                  <option value="price-low">💰 Lowest Price</option>
                </select>
              </div>

              {/* Clear Filters & Results Count */}
              <div className="flex items-center gap-3">
                {(searchTerm || selectedCategory !== 'All Categories' || selectedCondition !== 'All Conditions' || affordableOnly) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 underline"
                  >
                    Clear filters
                  </button>
                )}
                <div className="px-3 py-1 bg-green-100 dark:bg-green-900/50 rounded-lg">
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">
                    {filteredBooks.length} books
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-4">
        {/* Books Grid */}
        <div className="relative z-10">
            {/* Welcome Banner for New Users */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-700"
            >
              <div className="flex items-start gap-4">
                <div className="text-2xl">👋</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    New to buying textbooks here?
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                    Browse books below, message sellers directly, and meet safely on campus. All sellers are verified students.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-white dark:bg-slate-800 px-3 py-1 rounded-full text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                      💳 No payment required upfront
                    </span>
                    <span className="text-xs bg-white dark:bg-slate-800 px-3 py-1 rounded-full text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                      🤝 Meet on campus
                    </span>
                    <span className="text-xs bg-white dark:bg-slate-800 px-3 py-1 rounded-full text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                      ✅ Student verified
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {filteredBooks.length > 0 ? (
              <>
                {/* Results Summary */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} available
                    </h3>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Click any book to see details
                    </span>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1 }}
                  className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                {filteredBooks.map((book, index) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                    whileHover={{ y: -4, scale: 1.01 }}
                    className="group bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/60 dark:border-slate-600/60 hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-600/50 transition-all duration-300 h-full flex flex-col"
                  >
                    {/* Subtle Top Accent */}
                    <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-2xl"></div>
                    
                    {/* Book Details */}
                    <div className="p-4 space-y-3 flex-1 flex flex-col">
                      {/* Card Header with Controls */}
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <ConditionBadge condition={book.condition} />
                          {new Date() - new Date(book.postedDate) < 7 * 24 * 60 * 60 * 1000 && (
                            <span className="px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full">
                              🆕 NEW
                            </span>
                          )}
                        </div>
                      </div>

                      <div>
                        <Link
                          to={`/books/${book.id}`}
                          className="text-xl font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors block leading-tight mb-1"
                        >
                          {book.title}
                        </Link>
                        <p className="text-slate-600 dark:text-slate-300 text-sm font-medium mb-2">by {book.author}</p>
                        <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold">
                          📚 {book.category}
                        </span>
                      </div>

                      {/* Simple Price Display */}
                      <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                        <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                          ${book.price}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          💰 Free pickup on campus
                        </div>
                      </div>

                      {/* Compact Seller Info */}
                      <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                        <img
                          src={book.seller.avatar}
                          alt={book.seller.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-medium text-slate-700 dark:text-slate-200 truncate">{book.seller.name}</span>
                            <span className="text-xs text-green-600 dark:text-green-400">✓</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-400 text-xs">⭐</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">{book.seller.rating}</span>
                          </div>
                        </div>
                      </div>

                      {/* Book Info */}
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-700 flex-grow">
                        <span>📍 {book.location}</span>
                        <span>Posted {new Date(book.postedDate).toLocaleDateString()}</span>
                      </div>

                      {/* Compact Action Buttons */}
                      <div className="flex gap-2 pt-3 mt-auto">
                        <Link
                          to={`/books/${book.id}`}
                          className="flex-1 bg-blue-600 text-white text-center py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-xs font-semibold"
                        >
                          View Details
                        </Link>
                        <Link
                          to={`/contact-seller/${book.id}`}
                          className="px-3 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-xs font-semibold"
                        >
                          Message
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              </>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                  <span className="text-3xl">�</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">No books match your search</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-sm mx-auto">
                  Try searching for different keywords or adjusting your filters above.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearFilters}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-300"
                >
                  <span className="mr-2">🗑️</span>
                  Clear All Filters
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Trust and Safety Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/60 dark:border-slate-600/60"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Safe & Secure Trading
            </h3>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Your safety is our priority. Here's how we keep transactions secure and trustworthy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white/80 dark:bg-slate-800/80 rounded-2xl">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Student Verified</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                All sellers verify their student status with .edu email addresses
              </p>
            </div>

            <div className="text-center p-6 bg-white/80 dark:bg-slate-800/80 rounded-2xl">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏫</span>
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Campus Meetings</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Meet safely in public campus locations - library, student center, etc.
              </p>
            </div>

            <div className="text-center p-6 bg-white/80 dark:bg-slate-800/80 rounded-2xl">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Report System</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Easy reporting for any issues - we respond within 24 hours
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/safety-tips" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                Safety Tips
              </a>
              <a href="/community-guidelines" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                Community Guidelines
              </a>
              <a href="/support" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                Get Support
              </a>
            </div>
          </div>
        </motion.div>
      </div>
  )
}