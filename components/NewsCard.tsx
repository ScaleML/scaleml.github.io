'use client';

import { NewsPost } from '@/lib/content';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { formatDate } from '@/lib/utils';

interface NewsCardProps {
  post: NewsPost;
}

export default function NewsCard({ post }: NewsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-2xl overflow-hidden hover-lift"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-50 to-primary-50 flex items-center justify-center">
        <img
          src={post.image || '/assets/scaleml-logo.svg'}
          alt={post.title}
          className={`${post.image ? 'w-full h-full object-cover group-hover:scale-110' : 'w-2/3 h-2/3 object-contain'} transition-transform duration-500`}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Metadata */}
        <div className="flex items-center space-x-4 text-sm text-slate-500 mb-3">
          <div className="flex items-center">
            <Calendar size={16} className="mr-1" />
            {formatDate(post.date)}
          </div>
          {post.author && (
            <div className="flex items-center">
              <User size={16} className="mr-1" />
              {post.author}
            </div>
          )}
        </div>

        <h3 className="text-2xl font-bold mb-3 hover:text-primary-600 transition-colors">
          {post.title}
        </h3>
        <p className="text-slate-600 mb-4 line-clamp-3">{post.excerpt}</p>

        <Link
          href={`/news/${post.slug}`}
          className="inline-flex items-center text-primary-600 font-semibold hover:text-accent-600 transition-colors group"
        >
          Read more
          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
        </Link>
      </div>
    </motion.div>
  );
}
