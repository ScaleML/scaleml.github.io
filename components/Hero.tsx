'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-300/30 dark:bg-primary-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-300/30 dark:bg-accent-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 dark:bg-primary-500/20 dark:text-primary-200 px-4 py-2 rounded-full mb-8"
          >
            <Sparkles size={16} />
            <span className="text-sm font-medium">Cutting-edge AI and ML Research Laboratory</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Pioneering the Future of{' '}
            <span className="gradient-text">
              Artificial Intelligence
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto"
          >
            We push the boundaries of machine learning, computer vision, and natural
            language processing to solve real-world challenges.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/research"
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Explore Research
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <Link
              href="/people"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-700 bg-white border-2 border-primary-300 rounded-xl hover:bg-primary-50 hover:shadow-xl transition-all duration-300 dark:text-primary-200 dark:bg-slate-900/80 dark:border-primary-500/40 dark:hover:bg-slate-800"
            >
              Meet Our Team
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-20"
          >
            <div className="inline-flex flex-col items-center">
              <span className="text-sm text-slate-500 dark:text-slate-400 mb-2">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-slate-300 dark:border-slate-600 rounded-full flex justify-center">
                <div className="w-1.5 h-3 bg-slate-400 dark:bg-slate-300 rounded-full mt-2 animate-bounce"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
