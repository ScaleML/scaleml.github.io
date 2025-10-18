'use client';

import { motion } from 'framer-motion';
import { Users, BookOpen, Newspaper, FolderKanban } from 'lucide-react';

interface StatsClientProps {
  researchersCount: number;
  publicationsCount: number;
  newsCount: number;
  projectsCount: number;
}

export default function StatsClient({ researchersCount, publicationsCount, newsCount, projectsCount }: StatsClientProps) {
  const stats = [
    { icon: Users, label: 'Researchers', value: `${researchersCount}+` },
    { icon: BookOpen, label: 'Papers', value: `${publicationsCount}+` },
    { icon: FolderKanban, label: 'Research Projects', value: `${projectsCount}+` },
    { icon: Newspaper, label: 'News', value: `${newsCount}+` },
  ];

  return (
    <section className="py-20 bg-white/50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
            {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="text-white" size={32} />
              </div>
              <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-slate-600 dark:text-slate-300 font-medium">{stat.label}</div>
            </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
