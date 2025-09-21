// /src/pages/Contact.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockSkills } from '../data/mockSkills';

export default function Contact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [skill, setSkill] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    preferredTime: '',
    subject: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const foundSkill = mockSkills.find(s => s.id === parseInt(id));
    if (foundSkill) {
      setSkill(foundSkill);
      setFormData(prev => ({
        ...prev,
        subject: `Regarding: ${foundSkill.title}`
      }));
    } else {
      navigate('/skills');
    }
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate sending message
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Always use email communication - create a contact email for the skill
      const contactEmail = skill.contact.includes('@') 
        ? skill.contact 
        : `contact-${skill.id}@college.edu`; // Generate email for phone contacts
      
      const emailBody = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nPreferred Time: ${formData.preferredTime}\n\nMessage:\n${formData.message}\n\nNote: This message is regarding ${skill.title} by ${person.name}.`
      );
      window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(formData.subject)}&body=${emailBody}`;
      
      alert('Message sent successfully!');
      navigate(`/skills/${skill.id}`);
      
    } catch (error) {
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!skill) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-blue-50/20 dark:from-gray-900 dark:via-green-900/30 dark:to-blue-900/20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Skill not found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">The skill you're trying to contact about doesn't exist.</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-blue-50/20 dark:from-gray-900 dark:via-green-900/30 dark:to-blue-900/20 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent mb-4">
            � Contact {person.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Send a message about "{skill.title}"
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl border border-white/20 dark:border-gray-700/50 p-6 shadow-xl"
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Send Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Subject of your message"
                  />
                </div>

                <div>
                  <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Preferred Contact Time
                  </label>
                  <input
                    type="text"
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Weekdays 6-8 PM, Weekends anytime"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                    placeholder={isOffer ? "Tell the tutor what you'd like to work on, your current level, and any specific areas you need help with..." : "Introduce yourself and explain what help you can offer..."}
                  />
                </div>

                <div className="flex gap-4">
                  <Link
                    to={`/skills/${skill.id}`}
                    className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 text-center font-medium"
                  >
                    Back to Skill
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Skill Info Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl border border-white/20 dark:border-gray-700/50 p-6 shadow-xl"
            >
              <div className="text-center mb-6">
                <img
                  src={person.avatar}
                  alt={person.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-3 border-white/50"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {person.name}
                </h3>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <span className="text-yellow-500">⭐</span>
                  <span className="text-gray-600 dark:text-gray-300">{person.rating}</span>
                  {person.totalReviews && (
                    <span className="text-gray-500 dark:text-gray-400">
                      ({person.totalReviews} reviews)
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {skill.title}
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-full">
                      {skill.category}
                    </span>
                    <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs rounded-full">
                      {skill.subject}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span>💰</span>
                      <span>${skill.hourlyRate}/hr</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📍</span>
                      <span>{skill.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🕒</span>
                      <span>{skill.availability}</span>
                    </div>
                    {skill.contact && (
                      <div className="flex items-center gap-2">
                        <span>📧</span>
                        <span className="break-all">
                          {skill.contact.includes('@') 
                            ? skill.contact 
                            : `contact-${skill.id}@college.edu`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {skill.responseTime && (
                  <div className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-2 rounded-lg">
                    {skill.responseTime}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}