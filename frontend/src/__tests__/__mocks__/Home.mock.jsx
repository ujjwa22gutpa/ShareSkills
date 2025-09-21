// /src/__tests__/__mocks__/Home.mock.jsx
import React from 'react';
import { motion } from 'framer-motion';

// This is a simplified version of Home without react-three-fiber dependencies
export default function HomeMock() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div>
              <h1 className="text-4xl lg:text-6xl font-bold text-neutral-900 mb-6">
                Your Campus
                <span className="text-primary"> Marketplace</span>
              </h1>
              <p className="text-xl text-muted mb-8 leading-relaxed">
                Connect with fellow students to buy, sell, and exchange books and skills. Build your
                campus community while saving money and sharing knowledge.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-primary text-white rounded-lg font-semibold">
                  Browse Books
                </button>
                <button className="px-8 py-4 border border-primary text-primary rounded-lg font-semibold">
                  Explore Skills
                </button>
              </div>
            </motion.div>
            <div>
              <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                <p>3D Canvas Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
