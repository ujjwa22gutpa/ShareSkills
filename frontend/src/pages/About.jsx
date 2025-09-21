// /src/pages/About.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            About Campus Market
          </h1>
          <p className="text-xl text-muted leading-relaxed">
            Building a community where students help students succeed.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-surface dark:bg-surface rounded-2xl p-8 lg:p-12 shadow-lg"
        >
          <div className="prose prose-lg max-w-none">
            <p className="text-neutral-900 leading-relaxed mb-6">
              Campus Market was created by students, for students. We understand the challenges of
              college life – expensive textbooks, tight budgets, and the need to constantly learn
              new skills.
            </p>
            <p className="text-neutral-900 leading-relaxed mb-6">
              Our platform connects students within the same campus community, making it easy to buy
              and sell textbooks at fair prices, and exchange knowledge through skill sharing.
            </p>
            <p className="text-neutral-900 leading-relaxed">
              Whether you're looking for last semester's chemistry textbook or want to learn guitar
              from a fellow student, Campus Market is here to help you succeed while building
              meaningful connections.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
