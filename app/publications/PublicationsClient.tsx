'use client';

import { useState, useEffect } from 'react';
import { Publication } from '@/lib/content';
import PublicationCard from '@/components/PublicationCard';
import { Filter } from 'lucide-react';

interface PublicationsClientProps {
  publications: Publication[];
}

export default function PublicationsClient({ publications }: PublicationsClientProps) {
  const [filteredPublications, setFilteredPublications] = useState<Publication[]>(publications);
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    // Extract all unique tags
    const tags = new Set<string>();
    publications.forEach(publication => {
      publication.tags?.forEach(tag => tags.add(tag));
    });
    setAllTags(['All', ...Array.from(tags).sort()]);
  }, [publications]);

  useEffect(() => {
    if (selectedTag === 'All') {
      setFilteredPublications(publications);
    } else {
      setFilteredPublications(publications.filter(p => p.tags?.includes(selectedTag)));
    }
  }, [selectedTag, publications]);

  // Group by year
  const publicationsByYear = filteredPublications.reduce((acc, pub) => {
    if (!acc[pub.year]) {
      acc[pub.year] = [];
    }
    acc[pub.year].push(pub);
    return acc;
  }, {} as Record<number, typeof filteredPublications>);

  const years = Object.keys(publicationsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Publications</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Our research contributions to the scientific community
          </p>
        </div>

        {/* Filter Section */}
        {allTags.length > 1 && (
          <div className="mb-12">
            <div className="flex items-center justify-center mb-4">
              <Filter className="mr-2 text-slate-600 dark:text-slate-300" size={20} />
              <span className="text-lg font-semibold text-slate-700 dark:text-slate-200">Filter by Topic</span>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedTag === tag
                      ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg scale-105'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:border-slate-700'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Publications by Year */}
        {years.map((year) => (
          <div key={year} className="mb-12">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b-2 border-primary-200 dark:border-primary-500/40">
              {year}
            </h2>
            <div className="space-y-6">
              {publicationsByYear[year].map((pub) => (
                <PublicationCard
                  key={pub.slug}
                  publication={pub}
                  authorLimit={10}
                />
              ))}
            </div>
          </div>
        ))}

        {filteredPublications.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-slate-500 dark:text-slate-400">No publications found for this filter.</p>
          </div>
        )}
     </div>
   </div>
 );
}
