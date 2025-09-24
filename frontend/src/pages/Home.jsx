// /src/pages/Home.jsx
/**
 * Home page: Simple, trustworthy landing page design
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Simple & Trustworthy */}
      <section className="relative py-20 lg:py-32 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Trust Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-200">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Trusted by 10,000+ verified students
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Safe Student Marketplace
            </h1>

            {/* Simple Description */}
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Buy and sell textbooks, exchange skills, and connect with verified students on your campus. 
              Simple, secure, and trusted by thousands.
            </p>

            {/* Clear Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/signup">
                <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Join Your Campus
                </button>
              </Link>
              <Link to="/books">
                <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:border-gray-400 transition-colors">
                  Browse Books
                </button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-8 pt-12 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">100+</div>
                <div className="text-sm text-gray-500">Universities</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">50K+</div>
                <div className="text-sm text-gray-500">Books Sold</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">4.9★</div>
                <div className="text-sm text-gray-500">Rating</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works - Simple Steps */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Getting started is easy and safe
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Sign Up Free
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Create your account with college email verification
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Browse & Connect
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Find what you need or list what you want to sell
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Meet Safely
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Exchange on campus with verified students
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Clean & Simple */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Simple tools for campus marketplace success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xl mb-4">
                📚
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Buy & Sell Books
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Find affordable textbooks from fellow students. List your books for quick sales.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                  Verified sellers only
                </li>
                <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                  Campus pickup available
                </li>
                <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                  Save up to 70%
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xl mb-4">
                🎓
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Share Skills
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Teach what you know and learn from peers. Exchange knowledge safely.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                  Peer-to-peer learning
                </li>
                <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                  Flexible scheduling
                </li>
                <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                  Skill verification
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xl mb-4">
                🛡️
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Safe & Secure
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                All users verified with college emails. Meet safely on campus.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                  College email verification
                </li>
                <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                  Campus-only meetings
                </li>
                <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                  User rating system
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Call-to-Action */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of students saving money and sharing knowledge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Create Free Account
              </button>
            </Link>
            <Link to="/books">
              <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:border-gray-400 transition-colors">
                Browse Marketplace
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
