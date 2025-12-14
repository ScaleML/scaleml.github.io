import 'server-only';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { parse as parseBibtex } from 'bibtex-parse';

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
  code?: string;
  webpage?: string;
  media?: string;
  tags?: string[];
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

  // Read all .bib files (e.g., 2024.bib, 2025.bib)
  const files = fs.readdirSync(publicationsDirectory);
  const bibFiles = files.filter((f) => f.endsWith('.bib'));

  for (const bibFile of bibFiles) {
    const fullPath = path.join(publicationsDirectory, bibFile);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const entries = parseBibtex(fileContents);

    for (const entry of entries) {
      // bibtex-parse uses 'itemtype' instead of 'type'
      if (entry.itemtype !== 'entry') continue;

      // Convert fields array to object for easier access
      const fieldsObj: Record<string, string> = {};
      if (Array.isArray(entry.fields)) {
        for (const field of entry.fields) {
          fieldsObj[field.name] = field.value;
        }
      }

      // Parse author string: "Name1 and Name2 and Name3" -> ["Name1", "Name2", "Name3"]
      const authorStr = fieldsObj.author || '';
      const authors = authorStr
        .split(/\s+and\s+/)
        .map((a: string) => a.trim())
        .filter((a: string) => a.length > 0);

      allPublications.push({
        slug: entry.key || '',
        title: fieldsObj.title || '',
        authors,
        venue: fieldsObj.venue || fieldsObj.journal || fieldsObj.booktitle || '',
        year: parseInt(fieldsObj.year || '0', 10),
        featured: fieldsObj.featured === 'true',
        pdf: fieldsObj.arxiv || fieldsObj.pdf || fieldsObj.url || '',
        doi: fieldsObj.doi || '',
        abstract: fieldsObj.abstract || '',
        code: fieldsObj.code || '',
        webpage: fieldsObj.webpage || '',
        media: fieldsObj.media || '',
        tags: fieldsObj.tags ? fieldsObj.tags.split(',').map((t: string) => t.trim()) : [],
        content: '',
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
