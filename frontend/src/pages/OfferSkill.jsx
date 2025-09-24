import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { skillCategories } from '../data/mockSkills';

export default function OfferSkill() {
  const navigate = useNavigate();
  
  // Form state management
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    subject: '',
    hourlyRate: '',
    availability: '',
    location: '',
    contact: '',
    description: '',
    skills: [],
    newSkill: '',
    experience: '',
    qualifications: '',
    preferredContact: 'email',
    profilePhoto: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle adding skills
  const addSkill = () => {
    if (formData.newSkill.trim() && !formData.skills.includes(formData.newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, prev.newSkill.trim()],
        newSkill: ''
      }));
    }
  };

  // Handle photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          profilePhoto: 'Please select a valid image file'
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          profilePhoto: 'File size must be less than 5MB'
        }));
        return;
      }

      // Clear any previous errors
      setErrors(prev => ({
        ...prev,
        profilePhoto: ''
      }));

      // Update form data
      setFormData(prev => ({
        ...prev,
        profilePhoto: file
      }));

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove photo
  const removePhoto = () => {
    setFormData(prev => ({
      ...prev,
      profilePhoto: null
    }));
    setPhotoPreview(null);
    // Reset file input
    const fileInput = document.getElementById('profilePhoto');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  // Handle removing skills
  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  // Handle Enter key for adding skills
  const handleSkillKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  // Form validation function
  const validateForm = () => {
    const newErrors = {};

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters long';
    } else if (formData.title.trim().length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }

    // Category validation
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 2) {
      newErrors.subject = 'Subject must be at least 2 characters long';
    }

    // Hourly rate validation
    if (!formData.hourlyRate) {
      newErrors.hourlyRate = 'Hourly rate is required';
    } else {
      const rate = parseFloat(formData.hourlyRate);
      if (isNaN(rate) || rate < 5) {
        newErrors.hourlyRate = 'Hourly rate must be at least $5';
      } else if (rate > 200) {
        newErrors.hourlyRate = 'Hourly rate must be less than $200';
      }
    }

    // Availability validation
    if (!formData.availability.trim()) {
      newErrors.availability = 'Availability is required';
    }

    // Location validation
    if (!formData.location.trim()) {
      newErrors.location = 'Location preference is required';
    }

    // Contact validation
    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact information is required';
    } else {
      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // Phone validation (basic)
      const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
      
      if (!emailPattern.test(formData.contact) && !phonePattern.test(formData.contact.replace(/[\s\-\(\)]/g, ''))) {
        newErrors.contact = 'Please enter a valid email address or phone number';
      }
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Description must be at least 20 characters long';
    } else if (formData.description.trim().length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    // Skills validation
    if (formData.skills.length === 0) {
      newErrors.skills = 'At least one skill is required';
    }

    // Experience validation
    if (!formData.experience.trim()) {
      newErrors.experience = 'Experience information is required';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would send this data to your backend
      // For uploaded photos, you would typically upload to a cloud service first
      let avatarUrl = 'https://via.placeholder.com/150x150?text=User';
      
      // If user uploaded a profile photo, use the preview URL for demo purposes
      // In production, you'd upload the file to a cloud service and get the URL
      if (formData.profilePhoto && photoPreview) {
        avatarUrl = photoPreview;
      }

      const skillData = {
        id: Date.now(),
        title: formData.title.trim(),
        category: formData.category,
        subject: formData.subject.trim(),
        hourlyRate: parseFloat(formData.hourlyRate),
        availability: formData.availability.trim(),
        location: formData.location,
        contact: formData.contact.trim(),
        description: formData.description.trim(),
        skills: formData.skills,
        experience: formData.experience.trim(),
        qualifications: formData.qualifications.trim(),
        preferredContact: formData.preferredContact,
        type: 'offer',
        tutor: {
          name: 'Current User', // In real app, get from auth context
          rating: 0,
          totalReviews: 0,
          avatar: avatarUrl
        },
        verified: false,
        postedDate: new Date().toISOString()
      };

      // Backend integration: Replace with actual skill creation API call
      // const skillResponse = await api.createSkill(skillData);
      
      // Show success message or redirect
      alert('Skill offer published successfully! Your profile is now available in the Browse Skills section.');
      navigate('/skills');
      
    } catch (error) {
      // Backend integration: Handle actual API errors
      setErrors({ submit: 'Failed to publish skill offer. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            🎓 Offer Your Skills
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            Share your knowledge and help fellow students
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Title Field */}
              <div className="lg:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Advanced Calculus Tutoring"
                  required
                />
                {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
              </div>

              {/* Category Field */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="" className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100">Select category</option>
                  {skillCategories.filter(cat => cat !== 'All Categories').map((category) => (
                    <option key={category} value={category} className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="mt-1 text-sm text-red-400">{errors.category}</p>}
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Calculus, Java, Spanish"
                  required
                />
                {errors.subject && <p className="mt-1 text-sm text-red-400">{errors.subject}</p>}
              </div>

              {/* Hourly Rate Field */}
              <div>
                <label htmlFor="hourlyRate" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                  Hourly Rate ($) *
                </label>
                <input
                  type="number"
                  id="hourlyRate"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleInputChange}
                  min="5"
                  max="200"
                  step="0.50"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="25.00"
                  required
                />
                {errors.hourlyRate && <p className="mt-1 text-sm text-red-400">{errors.hourlyRate}</p>}
              </div>

              {/* Availability Field */}
              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                  Availability *
                </label>
                <input
                  type="text"
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Mon-Fri 6-9 PM, Weekends"
                  required
                />
                {errors.availability && <p className="mt-1 text-sm text-red-400">{errors.availability}</p>}
              </div>
            </div>

            {/* Location Field */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                Location Preference *
              </label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="" className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100">Select location preference</option>
                <option value="Online" className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100">Online Only</option>
                <option value="Campus" className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100">On Campus</option>
                <option value="Library" className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100">Library</option>
                <option value="Coffee Shop" className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100">Coffee Shop</option>
                <option value="Online/Campus" className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100">Online or Campus</option>
                <option value="Flexible" className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100">Flexible</option>
              </select>
              {errors.location && <p className="mt-1 text-sm text-red-400">{errors.location}</p>}
            </div>

            {/* Contact Information Field */}
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                Contact Information *
                <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
                  (Email or Phone Number)
                </span>
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., your.email@college.edu or +1-555-123-4567"
                required
              />
              {errors.contact && <p className="mt-1 text-sm text-red-400">{errors.contact}</p>}
            </div>

            {/* Profile Photo Section */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-3">
                Profile Photo
              </label>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600 dark:text-slate-300">Upload Your Photo</span>
                    {photoPreview && (
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <div className="relative">
                    <input
                      type="file"
                      id="profilePhoto"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="w-full px-4 py-8 bg-white/10 dark:bg-gray-700/30 border-2 border-dashed border-white/30 dark:border-gray-600/50 rounded-lg text-center hover:border-green-500 transition-colors">
                      {photoPreview ? (
                        <div className="space-y-2">
                          <img
                            src={photoPreview}
                            alt="Profile Preview"
                            className="mx-auto h-24 w-24 object-cover rounded-full border-2 border-white/20"
                          />
                          <p className="text-sm text-white/70 dark:text-gray-300">Click to change photo</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="mx-auto w-12 h-12 text-white/50 dark:text-gray-400">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 48 48">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-white/70 dark:text-gray-300">Click to upload your profile photo</p>
                            <p className="text-xs text-white/50 dark:text-gray-400">PNG, JPG, GIF up to 5MB</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {errors.profilePhoto && <p className="mt-2 text-sm text-red-400">{errors.profilePhoto}</p>}
            </div>

            {/* Skills Section */}
            <div>
              <label className="block text-sm font-medium text-white/90 dark:text-gray-200 mb-2">
                Specific Skills *
                <span className="text-xs text-white/60 dark:text-gray-400 ml-2">
                  (Add skills one by one)
                </span>
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  name="newSkill"
                  value={formData.newSkill}
                  onChange={handleInputChange}
                  onKeyPress={handleSkillKeyPress}
                  className="flex-1 px-4 py-2 bg-white/10 dark:bg-gray-700/30 border border-white/30 dark:border-gray-600/50 rounded-lg text-white dark:text-gray-100 placeholder-white/50 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent backdrop-blur-sm"
                  placeholder="e.g., Derivatives, Integrals, Limits"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  Add
                </button>
              </div>
              
              {formData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm rounded-full"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
              {errors.skills && <p className="mt-1 text-sm text-red-400">{errors.skills}</p>}
            </div>

            {/* Description Field */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-white/90 dark:text-gray-200 mb-2">
                Description *
                <span className="text-xs text-white/60 dark:text-gray-400 ml-2">
                  ({formData.description.length}/500 characters)
                </span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                maxLength="500"
                className="w-full px-4 py-3 bg-white/10 dark:bg-gray-700/30 border border-white/30 dark:border-gray-600/50 rounded-lg text-white dark:text-gray-100 placeholder-white/50 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent backdrop-blur-sm resize-none"
                placeholder="Describe your teaching experience, approach, and what makes you a great tutor..."
                required
              />
              {errors.description && <p className="mt-1 text-sm text-red-400">{errors.description}</p>}
            </div>

            {/* Experience and Qualifications */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Experience Field */}
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-white/90 dark:text-gray-200 mb-2">
                  Teaching Experience *
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 bg-white/10 dark:bg-gray-700/30 border border-white/30 dark:border-gray-600/50 rounded-lg text-white dark:text-gray-100 placeholder-white/50 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent backdrop-blur-sm resize-none"
                  placeholder="Describe your teaching or tutoring experience..."
                  required
                />
                {errors.experience && <p className="mt-1 text-sm text-red-400">{errors.experience}</p>}
              </div>

              {/* Qualifications Field */}
              <div>
                <label htmlFor="qualifications" className="block text-sm font-medium text-white/90 dark:text-gray-200 mb-2">
                  Qualifications (Optional)
                </label>
                <textarea
                  id="qualifications"
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 bg-white/10 dark:bg-gray-700/30 border border-white/30 dark:border-gray-600/50 rounded-lg text-white dark:text-gray-100 placeholder-white/50 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent backdrop-blur-sm resize-none"
                  placeholder="Degrees, certifications, relevant coursework..."
                />
              </div>
            </div>

            {/* Preferred Contact Method */}
            <div>
              <label className="block text-sm font-medium text-white/90 dark:text-gray-200 mb-3">
                Preferred Contact Method
              </label>
              <div className="flex gap-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="email"
                    checked={formData.preferredContact === 'email'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                  />
                  <span className="ml-2 text-white/90 dark:text-gray-200">Email</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="message"
                    checked={formData.preferredContact === 'message'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                  />
                  <span className="ml-2 text-white/90 dark:text-gray-200">Platform Messages</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="both"
                    checked={formData.preferredContact === 'both'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                  />
                  <span className="ml-2 text-white/90 dark:text-gray-200">Both</span>
                </label>
              </div>
            </div>

            {/* Submit Error Display */}
            {errors.submit && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <p className="text-red-400 text-sm">{errors.submit}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6">
              <motion.button
                type="button"
                onClick={() => navigate('/skills')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-gray-600/50 hover:bg-gray-600/70 text-white font-medium rounded-lg transition-all duration-200 backdrop-blur-sm"
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Publishing...' : 'Publish Skill Offer'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}