import 'server-only';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface Person {
  slug: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  email?: string;
  website?: string;
  scholar?: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
  alumni?: boolean;
  content: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  image?: string;
  video?: string;
  tags?: string[];
  highlights?: string[];
  date?: string;
  featured?: boolean;
  content: string;
}

export interface NewsPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author?: string;
  image?: string;
  content: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author?: string;
  image?: string;
  externalUrl?: string;
  content: string;
}

export interface Publication {
  slug: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  featured?: boolean;
  pdf?: string;
  doi?: string;
  abstract?: string;
  bibtex?: string;
  tags?: string[];
  highlights?: string[];
  content: string;
}

function getContentByType<T>(type: string): T[] {
  const typeDirectory = path.join(contentDirectory, type);

  if (!fs.existsSync(typeDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(typeDirectory);
  const allData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(typeDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        ...data,
        content,
      } as T;
    });

  return allData;
}

export function getPeople(): Person[] {
  return getContentByType<Person>('people');
}

export function getProjects(): Project[] {
  const projects = getContentByType<Project>('projects');
  return projects.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });
}

export function getNews(): NewsPost[] {
  const news = getContentByType<NewsPost>('news');
  return news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogs(): BlogPost[] {
  const blogs = getContentByType<BlogPost>('blogs');
  return blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPublications(): Publication[] {
  const publicationsDirectory = path.join(contentDirectory, 'publications');

  if (!fs.existsSync(publicationsDirectory)) {
    return [];
  }

  const allPublications: Publication[] = [];

  // Read all subdirectories (year folders)
  const entries = fs.readdirSync(publicationsDirectory, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const yearDir = path.join(publicationsDirectory, entry.name);
      const files = fs.readdirSync(yearDir);

      files
        .filter((fileName) => fileName.endsWith('.md'))
        .forEach((fileName) => {
          const slug = fileName.replace(/\.md$/, '');
          const fullPath = path.join(yearDir, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);

          allPublications.push({
            slug,
            ...data,
            content,
          } as Publication);
        });
    }
  }

  return allPublications.sort((a, b) => b.year - a.year);
}

export function getContentBySlug<T>(type: string, slug: string): T | null {
  const fullPath = path.join(contentDirectory, type, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    ...data,
    content,
  } as T;
}
