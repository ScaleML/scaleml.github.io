# ScaleML Lab Website

Academic research lab website built with Next.js 14, TypeScript, and Tailwind CSS.

## Getting Started

```bash
npm install      # Install dependencies
npm run dev      # Run development server (http://localhost:3000)
npm run build    # Build for production
```

## Content Management

All content is in the `content/` directory:

```
content/
├── people/          # Current lab members (.md)
│   └── alumni/      # Former members (auto-marked as alumni)
├── projects/        # Research projects (.md)
├── news/            # News posts (.md)
└── publications/    # BibTeX files (.bib)
```

### Adding a Person

Create `content/people/name.md` (or `content/people/alumni/name.md` for alumni):

```markdown
---
name: "Dr. Jane Smith"
role: "Postdoctoral Researcher"
bio: "Expert in machine learning"
image: "https://example.com/photo.jpg"
email: "jane@example.com"
website: "https://janesmith.com"
scholar: "https://scholar.google.com/..."
github: "janesmith"
---

Additional content in Markdown...
```

### Adding a Project

Create `content/projects/project-name.md`:

```markdown
---
title: "Project Title"
description: "Brief description"
image: "https://example.com/image.jpg"
tags: ["LLM", "RLHF"]
featured: true
---

Project details...
```

### Adding a Publication

Add to `content/publications/YEAR.bib` (e.g., `2025.bib`):

```bibtex
@article{key,
  title = {Paper Title},
  author = {Jane Doe and John Smith},
  venue = {NeurIPS},
  year = {2025},
  arxiv = {https://arxiv.org/pdf/xxxx.pdf},
  code = {https://github.com/example/repo},
  featured = {true}
}
```

### Adding News

Create `content/news/news-title.md`:

```markdown
---
title: "Paper Accepted at NeurIPS 2025"
date: "2025-01-15"
excerpt: "Brief summary"
---

Full content...
```

## Customization

- **Site metadata**: `app/layout.tsx`
- **Navigation**: `components/Navigation.tsx`
- **Footer**: `components/Footer.tsx`
- **Colors**: `tailwind.config.ts`

## Deployment

Push to GitHub and deploy on [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
