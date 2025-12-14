'use client';

import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { NewsPost } from '@/lib/content';
import { formatDate } from '@/lib/utils';

interface LatestNewsClientProps {
  news: NewsPost[];
}

export default function LatestNewsClient({ news }: LatestNewsClientProps) {
  return (
    <section className="py-20 bg-white/90 dark:bg-slate-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Latest <span className="gradient-text">News</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Stay updated with our recent achievements and announcements
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-xl overflow-hidden hover-lift"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-50 to-primary-50 dark:from-slate-900 dark:to-primary-900/40 flex items-center justify-center">
                <img
                  src={item.image || '/assets/scaleml-logo.svg'}
                  alt={item.title}
                  className={`${item.image ? 'w-full h-full object-cover hover:scale-110' : 'w-2/3 h-2/3 object-contain'} transition-transform duration-500`}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-4">
                  <Calendar size={16} className="mr-2" />
                  {formatDate(item.date)}
                </div>
                <h3 className="text-xl font-bold mb-3 hover:text-primary-600 dark:hover:text-primary-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">{item.excerpt}</p>
                <Link
                  href={`/news/${item.slug}`}
                  className="inline-flex items-center text-primary-600 dark:text-primary-300 font-semibold hover:text-accent-600 dark:hover:text-accent-300 transition-colors group"
                >
                  Read more
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/news"
            className="inline-flex items-center px-8 py-4 bg-white border-2 border-primary-300 text-primary-700 font-semibold rounded-xl hover:bg-primary-50 hover:shadow-xl transition-all duration-300 dark:bg-slate-900 dark:border-primary-500/40 dark:text-primary-200 dark:hover:bg-slate-800"
          >
            View All News
          </Link>
        </div>
      </div>
    </section>
  );
}
