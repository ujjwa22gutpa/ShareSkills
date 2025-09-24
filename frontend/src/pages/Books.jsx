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
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [savedBooks, setSavedBooks] = useState(new Set());
  const [viewMode, setViewMode] = useState('grid');

  // Filter and sort books
  const filteredBooks = useMemo(() => {
    return mockBooks
      .filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            book.subject.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = selectedCategory === 'All Categories' || 
                               book.category === selectedCategory;
        
        const matchesCondition = selectedCondition === 'All Conditions' ||
                                book.condition === selectedCondition;
        
        const matchesPrice = book.price >= selectedPriceRange.min && 
                            book.price <= selectedPriceRange.max;
        
        return matchesSearch && matchesCategory && matchesCondition && matchesPrice;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'newest':
            return new Date(b.postedDate) - new Date(a.postedDate);
          case 'popular':
            return b.views - a.views;
          default:
            return 0;
        }
      });
  }, [searchTerm, selectedCategory, selectedCondition, selectedPriceRange, sortBy]);

  const toggleSaveBook = (bookId) => {
    const newSavedBooks = new Set(savedBooks);
    if (newSavedBooks.has(bookId)) {
      newSavedBooks.delete(bookId);
    } else {
      newSavedBooks.add(bookId);
    }
    setSavedBooks(newSavedBooks);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Categories');
    setSelectedCondition('All Conditions');
    setSelectedPriceRange(priceRanges[0]);
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
              className="space-y-2"
            >
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                📚 Books Marketplace
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-lg">
                Discover affordable textbooks from fellow students
              </p>
              <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>{mockBooks.length} books available</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Save up to 70%</span>
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
                to="/books/add"
                className="group relative inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <span className="mr-2 group-hover:rotate-12 transition-transform duration-300">📚</span>
                <span>Sell a Book</span>
              </Link>
            </motion.div>
          </div>

          {/* Enhanced Search Bar */}
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, author, subject, or ISBN..."
            onClear={() => setSearchTerm('')}
          />

          {/* Enhanced Controls */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-4 py-2 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 lg:hidden"
              >
                <span className="mr-2">⚙️</span>
                Filters
                <span className="ml-2 transform transition-transform duration-300" style={{ transform: showFilters ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
              </button>

              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  ⚏
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  ☰
                </button>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-2 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                >
                  <option value="newest">🆕 Newest First</option>
                  <option value="price-low">💰 Price: Low to High</option>
                  <option value="price-high">💎 Price: High to Low</option>
                  <option value="popular">🔥 Most Popular</option>
                </select>
              </div>
              
              <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/50 rounded-xl">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {filteredBooks.length} books found
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content with proper spacing to avoid sticky header overlap */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-4">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Enhanced Filters Sidebar */}
          <AnimatePresence>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}
            >
              <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/60 dark:border-slate-600/60 p-6 sticky top-4 lg:top-6 z-30">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    🎯 Filters
                  </h2>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                {/* Category Filter */}
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    📖 Category
                  </h3>
                  <div className="space-y-3">
                    {categories.map(category => (
                      <label key={category} className="flex items-center group cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-4 h-4 text-blue-600 border-2 border-slate-300 dark:border-slate-500 focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="ml-3 text-sm text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Condition Filter */}
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    ⭐ Condition
                  </h3>
                  <div className="space-y-3">
                    {conditions.map(condition => (
                      <label key={condition} className="flex items-center group cursor-pointer">
                        <input
                          type="radio"
                          name="condition"
                          value={condition}
                          checked={selectedCondition === condition}
                          onChange={(e) => setSelectedCondition(e.target.value)}
                          className="w-4 h-4 text-green-600 border-2 border-slate-300 dark:border-slate-500 focus:ring-green-500 focus:ring-2"
                        />
                        <span className="ml-3 text-sm text-slate-700 dark:text-slate-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                          {condition}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                    💰 Price Range
                  </h3>
                  <div className="space-y-3">
                    {priceRanges.map((range, index) => (
                      <label key={index} className="flex items-center group cursor-pointer">
                        <input
                          type="radio"
                          name="priceRange"
                          checked={selectedPriceRange === range}
                          onChange={() => setSelectedPriceRange(range)}
                          className="w-4 h-4 text-amber-600 border-2 border-slate-300 dark:border-slate-500 focus:ring-amber-500 focus:ring-2"
                        />
                        <span className="ml-3 text-sm text-slate-700 dark:text-slate-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Enhanced Books Grid */}
          <div className="lg:col-span-3 mt-8 lg:mt-0 relative z-10">
            {filteredBooks.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
                className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
                    : 'grid-cols-1'
                }`}
              >
                {filteredBooks.map((book, index) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-200/60 dark:border-slate-600/60 overflow-hidden hover:shadow-2xl transition-all duration-500"
                  >
                    {/* Enhanced Book Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={book.images[0]}
                        alt={book.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleSaveBook(book.id)}
                        className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300"
                      >
                        <span className="text-lg">
                          {savedBooks.has(book.id) ? '❤️' : '🤍'}
                        </span>
                      </motion.button>
                      
                      {/* Enhanced Condition Badge */}
                      <div className="absolute top-4 left-4">
                        <ConditionBadge condition={book.condition} />
                      </div>

                      {/* New Badge for recent listings */}
                      {new Date() - new Date(book.postedDate) < 7 * 24 * 60 * 60 * 1000 && (
                        <div className="absolute bottom-4 left-4">
                          <span className="px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full shadow-lg">
                            🆕 NEW
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Enhanced Book Details */}
                    <div className="p-6 space-y-4">
                      <div>
                        <Link
                          to={`/books/${book.id}`}
                          className="text-xl font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors block leading-tight"
                        >
                          {book.title}
                        </Link>
                        <p className="text-slate-600 dark:text-slate-300 mt-1 font-medium">by {book.author}</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                          {book.category}
                        </span>
                      </div>

                      {/* Enhanced Price Display */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                            ${book.price}
                          </span>
                          {book.originalPrice && (
                            <span className="text-lg text-slate-400 line-through">
                              ${book.originalPrice}
                            </span>
                          )}
                        </div>
                        {book.originalPrice && (
                          <div className="inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                            <span className="text-sm text-green-700 dark:text-green-400 font-bold">
                              💰 Save ${(book.originalPrice - book.price).toFixed(2)} ({Math.round((1 - book.price / book.originalPrice) * 100)}% off)
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Enhanced Seller Info */}
                      <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/60 rounded-2xl">
                        <img
                          src={book.seller.avatar}
                          alt={book.seller.name}
                          className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-600 shadow-md"
                        />
                        <div className="flex-1">
                          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{book.seller.name}</span>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-400">⭐</span>
                            <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">{book.seller.rating}</span>
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Stats */}
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="space-y-1">
                          <div className="text-xl">👁️</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">{book.views} views</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-xl">📍</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{book.location}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-xl">📅</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">{new Date(book.postedDate).toLocaleDateString()}</div>
                        </div>
                      </div>

                      {/* Enhanced Action Buttons */}
                      <div className="flex gap-3 pt-2">
                        <Link
                          to={`/books/${book.id}`}
                          className="flex-1 bg-blue-600 text-white text-center py-3 px-4 rounded-2xl hover:bg-blue-700 transition-all duration-300 text-sm font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          📖 View Details
                        </Link>
                        <Link
                          to={`/contact-seller/${book.id}`}
                        >
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 rounded-2xl text-slate-700 dark:text-slate-300 hover:border-blue-300 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 text-sm font-bold shadow-md hover:shadow-lg"
                          >
                            💬
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-4xl">🔍</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">No books found</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-md mx-auto">
                  We couldn't find any books matching your criteria. Try adjusting your search or filters.
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
      </div>
    </div>
  );
}