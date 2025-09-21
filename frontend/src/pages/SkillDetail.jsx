import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockSkills, mockReviews } from '../data/mockSkills';

export default function SkillDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [skill, setSkill] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const foundSkill = mockSkills.find(s => s.id === parseInt(id));
    if (foundSkill) {
      setSkill(foundSkill);
      setReviews(mockReviews[foundSkill.id] || []);
    } else {
      navigate('/skills');
    }
  }, [id, navigate]);

  if (!skill) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-blue-50/20 dark:from-gray-900 dark:via-green-900/30 dark:to-blue-900/20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Skill not found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">The skill you're looking for doesn't exist.</p>
          <Link
            to="/skills"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Skills
          </Link>
        </div>
      </div>
    );
  }

  const person = skill.tutor || skill.student;
  const isOffer = skill.type === 'offer';

  const BookingModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={() => setShowBookingModal(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {isOffer ? 'Book a Session' : 'Send Message'}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Preferred Date & Time
            </label>
            <input
              type="datetime-local"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Message
            </label>
            <textarea
              rows="4"
              placeholder={isOffer ? "Tell the tutor what you'd like to work on..." : "Introduce yourself and explain what help you need..."}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowBookingModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert(isOffer ? 'Booking request sent!' : 'Message sent!');
                setShowBookingModal(false);
              }}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {isOffer ? 'Send Request' : 'Send Message'}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-blue-50/20 dark:from-gray-900 dark:via-green-900/30 dark:to-blue-900/20">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg border-b border-white/20 dark:border-gray-700/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate('/skills')}
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-4"
          >
            ← Back to Skills
          </button>

          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            {/* Profile Section */}
            <div className="flex items-start gap-4 flex-1">
              <img
                src={person.avatar}
                alt={person.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white/50 shadow-lg"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {person.name}
                  </h1>
                  {skill.verified && (
                    <span className="text-blue-500 text-xl">✓</span>
                  )}
                </div>
                
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {person.rating}
                    </span>
                    {person.totalReviews && (
                      <span className="text-gray-600 dark:text-gray-300">
                        ({person.totalReviews} reviews)
                      </span>
                    )}
                  </div>
                  
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    isOffer 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                  }`}>
                    {isOffer ? '🎓 Offering Tutoring' : '🙋‍♂️ Looking for Help'}
                  </div>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {skill.title}
                </h2>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm rounded-full">
                    {skill.category}
                  </span>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-sm rounded-full">
                    {skill.subject}
                  </span>
                </div>
              </div>
            </div>

            {/* Pricing and CTA */}
            <div className="lg:w-80 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl border border-white/20 dark:border-gray-700/50 p-6 shadow-xl">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  ${skill.hourlyRate}/hr
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {skill.availability}
                </div>
                {skill.responseTime && (
                  <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                    {skill.responseTime}
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowBookingModal(true)}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-3"
              >
                {isOffer ? 'Book Session' : 'Send Message'}
              </button>

              {/* Contact Button - Always navigate to contact page */}
              {skill.contact && (
                <Link
                  to={`/contact/${skill.id}`}
                  className="w-full px-6 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-2 border-blue-200 dark:border-blue-600 rounded-xl font-medium hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-300 mb-3 flex items-center justify-center gap-2"
                >
                  <span className="text-lg">📧</span>
                  <span>Send Email</span>
                </Link>
              )}

              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>{skill.location}</span>
                </div>
                {skill.tags && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {skill.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white/50 dark:bg-gray-800/50 p-1 rounded-xl">
          {['overview', 'skills', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl border border-white/20 dark:border-gray-700/50 p-6 shadow-xl"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  About
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {skill.description}
                </p>

                {/* Contact Information - Always show as email */}
                {skill.contact && (
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Contact Information
                    </h4>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">📧</span>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Email
                          </p>
                          <p className="text-gray-900 dark:text-white font-medium">
                            {skill.contact.includes('@') 
                              ? skill.contact 
                              : `contact-${skill.id}@college.edu`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'skills' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl border border-white/20 dark:border-gray-700/50 p-6 shadow-xl"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {isOffer ? 'Skills Offered' : 'Skills Needed'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {skill.skills.map((skillItem, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                    >
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {skillItem}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl border border-white/20 dark:border-gray-700/50 p-6 shadow-xl"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {review.studentName}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {review.subject} • {new Date(review.date).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={i < review.rating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'}
                            >
                              ⭐
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        {review.comment}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl border border-white/20 dark:border-gray-700/50 p-6 shadow-xl text-center">
                    <div className="text-4xl mb-2">📝</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      No reviews yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Be the first to leave a review after your session!
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl border border-white/20 dark:border-gray-700/50 p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Response Time</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {skill.responseTime || '< 24 hours'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Total Reviews</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {person.totalReviews || reviews.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Member Since</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {new Date(skill.postedDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Similar Skills */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl border border-white/20 dark:border-gray-700/50 p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Similar Skills
              </h3>
              <div className="space-y-3">
                {mockSkills
                  .filter(s => s.id !== skill.id && s.category === skill.category)
                  .slice(0, 3)
                  .map((similarSkill) => {
                    const similarPerson = similarSkill.tutor || similarSkill.student;
                    return (
                      <Link
                        key={similarSkill.id}
                        to={`/skills/${similarSkill.id}`}
                        className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={similarPerson.avatar}
                            alt={similarPerson.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 dark:text-white text-sm truncate">
                              {similarPerson.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {similarSkill.subject} • ${similarSkill.hourlyRate}/hr
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showBookingModal && <BookingModal />}
    </div>
  );
}