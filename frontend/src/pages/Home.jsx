// /src/pages/Home.jsx
/**
 * Home page: Modern, engaging landing page design with enhanced UX
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Box } from '@react-three/drei';
import { Link } from 'react-router-dom';

// 3D Scene Component
function FloatingElements() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, 5]} intensity={0.4} color="#0EA5A4" />
      
      {/* Main floating sphere */}
      <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#0EA5A4" 
          metalness={0.3} 
          roughness={0.2}
        />
      </Sphere>
      
      {/* Floating cubes */}
      <Box args={[0.3, 0.3, 0.3]} position={[2.5, 1, -1]}>
        <meshStandardMaterial color="#F59E0B" />
      </Box>
      <Box args={[0.2, 0.2, 0.2]} position={[-2, -1.5, 1]}>
        <meshStandardMaterial color="#EF4444" />
      </Box>
      <Box args={[0.4, 0.4, 0.4]} position={[1.5, -2, 2]}>
        <meshStandardMaterial color="#8B5CF6" />
      </Box>
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate 
        autoRotateSpeed={1.5}
      />
    </>
  );
}

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section - Enhanced with modern design */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-primary/5 via-purple-50/30 to-orange-50/20 dark:from-gray-900 dark:via-purple-900/20 dark:to-orange-900/10 transition-colors duration-300">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-20 w-40 h-40 bg-orange-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-purple-400 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.div variants={itemVariants} className="space-y-2">
                <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  🎓 Built for Students, By Students
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold text-neutral-900 leading-tight">
                  Your Campus
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                    Marketplace
                  </span>
                </h1>
              </motion.div>

              <motion.p 
                variants={itemVariants} 
                className="text-xl lg:text-2xl text-muted leading-relaxed max-w-lg"
              >
                Connect with fellow students to buy, sell, and exchange books and skills. 
                <span className="text-primary font-semibold"> Save money</span> and 
                <span className="text-purple-600 font-semibold"> share knowledge</span> 
                within your campus community.
              </motion.p>

              <motion.div 
                variants={itemVariants} 
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/books">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(14, 165, 164, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-primary/90 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    📚 Browse Books
                  </motion.button>
                </Link>
                <Link to="/skills">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    🎓 Explore Skills
                  </motion.button>
                </Link>
              </motion.div>

              <motion.div 
                variants={itemVariants} 
                className="flex items-center gap-8 pt-8"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-neutral-900">500+</div>
                  <div className="text-sm text-muted">Books Listed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-neutral-900">200+</div>
                  <div className="text-sm text-muted">Skills Shared</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-neutral-900">1k+</div>
                  <div className="text-sm text-muted">Students</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Enhanced 3D Canvas */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: -30 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-96 lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-100"
            >
              <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <FloatingElements />
              </Canvas>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary/10 to-purple-100 text-primary rounded-full text-sm font-medium mb-6">
              ✨ Why Choose Campus Marketplace
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Everything you need for 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600"> campus life</span>
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              From textbooks to tutoring, find what you need and share what you know. 
              Build meaningful connections while making campus life more affordable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '📚',
                gradient: 'from-blue-500 to-primary',
                title: 'Buy & Sell Books',
                description: 'Find affordable textbooks and sell your used books to other students. Save up to 70% compared to bookstore prices.',
                features: ['Price comparison', 'Condition ratings', 'Campus pickup']
              },
              {
                icon: '🎓',
                gradient: 'from-purple-500 to-pink-500',
                title: 'Exchange Skills',
                description: 'Teach what you know and learn new skills from your peers. From coding to languages, expand your knowledge.',
                features: ['Peer tutoring', 'Skill matching', 'Flexible scheduling']
              },
              {
                icon: '🤝',
                gradient: 'from-orange-500 to-red-500',
                title: 'Connect Locally',
                description: 'Meet face-to-face with students on your campus for safe exchanges. Build your campus network.',
                features: ['Campus verification', 'Safe meetups', 'Student profiles']
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">{feature.title}</h3>
                <p className="text-muted leading-relaxed mb-6">{feature.description}</p>
                <div className="space-y-2">
                  {feature.features.map((item, i) => (
                    <div key={i} className="flex items-center text-sm text-muted">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Call-to-Action Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Ready to join your campus community?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Start saving money on textbooks and discovering new skills today. Join thousands of students already using Campus Marketplace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-primary rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Started Free
                </motion.button>
              </Link>
              <Link to="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-white text-white rounded-2xl font-semibold hover:bg-white hover:text-primary transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
