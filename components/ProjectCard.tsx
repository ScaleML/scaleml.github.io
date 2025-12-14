'use client';

import { Project } from '@/lib/content';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { formatDate } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group glass rounded-2xl overflow-hidden hover-lift flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative h-48 flex-shrink-0 overflow-hidden bg-white dark:bg-slate-900 flex items-center justify-center">
        <img
          src={project.image || '/assets/scaleml-logo.svg'}
          alt={project.title}
          className={`${project.image ? 'w-full h-full object-contain group-hover:scale-110' : 'w-2/3 h-2/3 object-contain'} transition-transform duration-500`}
        />
        {project.featured && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-accent-500 text-white text-sm font-semibold rounded-full">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3 flex-grow">{project.description}</p>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {project.highlights.map((highlight) => (
              <span
                key={highlight}
                className="px-3 py-1 bg-accent-100 text-accent-700 dark:bg-accent-500/20 dark:text-accent-200 text-sm rounded-full font-semibold"
              >
                {highlight}
              </span>
            ))}
          </div>
        )}

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary-100 text-primary-700 dark:bg-primary-500/20 dark:text-primary-200 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Date */}
        {project.date && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            {formatDate(project.date)}
          </p>
        )}

        <Link
          href={`/research/${project.slug}`}
          className="inline-flex items-center text-primary-600 dark:text-primary-300 font-semibold hover:text-accent-600 dark:hover:text-accent-300 transition-colors group mt-auto"
        >
          Learn more
          <ExternalLink className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
        </Link>
      </div>
    </motion.div>
  );
}
