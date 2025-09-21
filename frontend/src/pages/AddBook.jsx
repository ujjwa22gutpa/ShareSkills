import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const navigate = useNavigate();
  
  // Form state management
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    condition: '',
    category: '',
    description: '',
    image: '',
    imageFile: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

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

  // Handle image file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          image: 'Please select a valid image file'
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          image: 'File size must be less than 5MB'
        }));
        return;
      }

      // Clear any previous errors
      setErrors(prev => ({
        ...prev,
        image: ''
      }));

      // Update form data
      setFormData(prev => ({
        ...prev,
        imageFile: file,
        image: '' // Clear URL when file is uploaded
      }));

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove uploaded image
  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      imageFile: null,
      image: ''
    }));
    setImagePreview(null);
    // Reset file input
    const fileInput = document.getElementById('imageFile');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  // Form validation function
  const validateForm = () => {
    const newErrors = {};

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Book title is required';
    } else if (formData.title.trim().length < 2) {
      newErrors.title = 'Title must be at least 2 characters long';
    } else if (formData.title.trim().length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }

    // Author validation
    if (!formData.author.trim()) {
      newErrors.author = 'Author name is required';
    } else if (formData.author.trim().length < 2) {
      newErrors.author = 'Author name must be at least 2 characters long';
    } else if (formData.author.trim().length > 50) {
      newErrors.author = 'Author name must be less than 50 characters';
    }

    // Price validation
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else {
      const price = parseFloat(formData.price);
      if (isNaN(price) || price < 0) {
        newErrors.price = 'Price must be a valid positive number';
      } else if (price > 10000) {
        newErrors.price = 'Price must be less than $10,000';
      }
    }

    // Condition validation
    if (!formData.condition) {
      newErrors.condition = 'Book condition is required';
    }

    // Category validation
    if (!formData.category) {
      newErrors.category = 'Book category is required';
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
    } else if (formData.description.trim().length > 1000) {
      newErrors.description = 'Description must be less than 1000 characters';
    }

    // Image validation (optional - either file upload or URL)
    if (formData.image && formData.image.trim() && !formData.imageFile) {
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      if (!urlPattern.test(formData.image.trim())) {
        newErrors.image = 'Please enter a valid URL';
      }
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
      // For uploaded files, you would typically upload to a cloud service first
      let imageUrl = formData.image.trim() || 'https://via.placeholder.com/200x300?text=Book+Cover';
      
      // If user uploaded a file, use the preview URL for demo purposes
      // In production, you'd upload the file to a cloud service and get the URL
      if (formData.imageFile) {
        imageUrl = imagePreview; // This would be replaced with actual uploaded URL
      }

      const bookData = {
        id: Date.now(), // Temporary ID generation
        title: formData.title.trim(),
        author: formData.author.trim(),
        price: parseFloat(formData.price),
        condition: formData.condition,
        category: formData.category,
        description: formData.description.trim(),
        image: imageUrl,
        seller: 'Current User', // In real app, get from auth context
        dateAdded: new Date().toISOString()
      };

      // Backend integration: Replace with actual book creation API call
      // const bookResponse = await api.createBook(bookData);
      
      // Show success message or redirect
      alert('Book added successfully! Your book is now available in the Browse Books section.');
      navigate('/books');
      
    } catch (error) {
      // Backend integration: Handle actual API errors
      setErrors({ submit: 'Failed to publish book. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Add New Book
          </h1>
          <p className="text-blue-200 dark:text-gray-300 text-lg">
            Share your books with the community
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl border border-white/20 dark:border-gray-700/50 p-8 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-white/90 dark:text-gray-200 mb-2">
                Book Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 dark:bg-gray-700/30 border border-white/30 dark:border-gray-600/50 rounded-lg text-white dark:text-gray-100 placeholder-white/50 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                placeholder="Enter book title"
                required
              />
              {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
            </div>

            {/* Author Field */}
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-white/90 dark:text-gray-200 mb-2">
                Author *
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 dark:bg-gray-700/30 border border-white/30 dark:border-gray-600/50 rounded-lg text-white dark:text-gray-100 placeholder-white/50 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                placeholder="Enter author name"
                required
              />
              {errors.author && <p className="mt-1 text-sm text-red-400">{errors.author}</p>}
            </div>

            {/* Price and Condition Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price Field */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-white/90 dark:text-gray-200 mb-2">
                  Price ($) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 bg-white/10 dark:bg-gray-700/30 border border-white/30 dark:border-gray-600/50 rounded-lg text-white dark:text-gray-100 placeholder-white/50 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                  placeholder="0.00"
                  required
                />
                {errors.price && <p className="mt-1 text-sm text-red-400">{errors.price}</p>}
              </div>

              {/* Condition Field */}
              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-white/90 dark:text-gray-200 mb-2">
                  Condition *
                </label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 dark:bg-gray-700/30 border border-white/30 dark:border-gray-600/50 rounded-lg text-white dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                  required
                >
                  <option value="" className="bg-gray-800 text-gray-100">Select condition</option>
                  <option value="Like New" className="bg-gray-800 text-gray-100">Like New</option>
                  <option value="Very Good" className="bg-gray-800 text-gray-100">Very Good</option>
                  <option value="Good" className="bg-gray-800 text-gray-100">Good</option>
                  <option value="Fair" className="bg-gray-800 text-gray-100">Fair</option>
                </select>
                {errors.condition && <p className="mt-1 text-sm text-red-400">{errors.condition}</p>}
              </div>
            </div>

            {/* Category Field */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-white/90 dark:text-gray-200 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 dark:bg-gray-700/30 border border-white/30 dark:border-gray-600/50 rounded-lg text-white dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                required
              >
                <option value="" className="bg-gray-800 text-gray-100">Select category</option>
                <option value="Textbook" className="bg-gray-800 text-gray-100">Textbook</option>
                <option value="Fiction" className="bg-gray-800 text-gray-100">Fiction</option>
                <option value="Non-Fiction" className="bg-gray-800 text-gray-100">Non-Fiction</option>
                <option value="Reference" className="bg-gray-800 text-gray-100">Reference</option>
                <option value="Study Guide" className="bg-gray-800 text-gray-100">Study Guide</option>
                <option value="Other" className="bg-gray-800 text-gray-100">Other</option>
              </select>
              {errors.category && <p className="mt-1 text-sm text-red-400">{errors.category}</p>}
            </div>

            {/* Book Photo Section */}
            <div>
              <label className="block text-sm font-medium text-white/90 dark:text-gray-200 mb-3">
                Book Photo
              </label>
              
              {/* Photo Upload Option */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/70 dark:text-gray-300">Upload Photo</span>
                    {imagePreview && (
                      <button
                        type="button"
                        onClick={removeImage}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <div className="relative">
                    <input
                      type="file"
                      id="imageFile"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="w-full px-4 py-8 bg-white/10 dark:bg-gray-700/30 border-2 border-dashed border-white/30 dark:border-gray-600/50 rounded-lg text-center hover:border-blue-500 transition-colors">
                      {imagePreview ? (
                        <div className="space-y-2">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="mx-auto h-32 w-24 object-cover rounded-lg"
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
                            <p className="text-white/70 dark:text-gray-300">Click to upload a photo</p>
                            <p className="text-xs text-white/50 dark:text-gray-400">PNG, JPG, GIF up to 5MB</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* OR Divider */}
                <div className="flex items-center">
                  <div className="flex-1 border-t border-white/20 dark:border-gray-600"></div>
                  <span className="px-4 text-sm text-white/50 dark:text-gray-400">OR</span>
                  <div className="flex-1 border-t border-white/20 dark:border-gray-600"></div>
                </div>

                {/* URL Input Option */}
                <div>
                  <label htmlFor="image" className="block text-sm text-white/70 dark:text-gray-300 mb-2">
                    Enter Image URL
                  </label>
                  <input
                    type="url"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    disabled={!!formData.imageFile}
                    className="w-full px-4 py-3 bg-white/10 dark:bg-gray-700/30 border border-white/30 dark:border-gray-600/50 rounded-lg text-white dark:text-gray-100 placeholder-white/50 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="https://example.com/book-image.jpg"
                  />
                </div>
              </div>
              
              {errors.image && <p className="mt-2 text-sm text-red-400">{errors.image}</p>}
            </div>

            {/* Description Field */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-white/90 dark:text-gray-200 mb-2">
                Description *
                <span className="text-xs text-white/60 dark:text-gray-400 ml-2">
                  ({formData.description.length}/1000 characters)
                </span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                maxLength="1000"
                className="w-full px-4 py-3 bg-white/10 dark:bg-gray-700/30 border border-white/30 dark:border-gray-600/50 rounded-lg text-white dark:text-gray-100 placeholder-white/50 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm resize-none"
                placeholder="Describe the book's content, any highlights, condition notes, etc."
                required
              />
              {errors.description && <p className="mt-1 text-sm text-red-400">{errors.description}</p>}
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
                onClick={() => navigate('/books')}
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
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Publishing...' : 'Publish Book'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddBook;