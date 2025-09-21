import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockBooks } from '../data/mockBooks';
import ConditionBadge from '../components/ui/ConditionBadge';

export default function BookDetail() {
  const { id } = useParams();
  
  // Find the book by ID
  const book = mockBooks.find(book => book.id === parseInt(id));

  // If book not found, show error message
  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-900/30 dark:to-purple-900/20 transition-colors duration-300 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Book Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The book you're looking for doesn't exist.</p>
          <Link 
            to="/books" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            ← Back to Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-900/30 dark:to-purple-900/20 transition-colors duration-300">
      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link 
            to="/books" 
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            ← Back to Books
          </Link>
        </motion.div>

        {/* Book Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {book.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              by {book.author}
            </p>
            
            {/* Condition Badge */}
            <div className="mb-6">
              <ConditionBadge condition={book.condition} />
            </div>

            {/* Basic book information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Book Details</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li><span className="font-medium">Subject:</span> {book.subject}</li>
                  <li><span className="font-medium">Category:</span> {book.category}</li>
                  <li><span className="font-medium">Price:</span> ${book.price}</li>
                  <li><span className="font-medium">Posted:</span> {new Date(book.postedDate).toLocaleDateString()}</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Seller Information</h3>
                <div className="flex items-center space-x-3">
                  <img 
                    src={book.seller.avatar} 
                    alt={book.seller.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{book.seller.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">⭐ {book.seller.rating} rating</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Button */}
            <div className="mt-8">
              <button className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Contact Seller
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}