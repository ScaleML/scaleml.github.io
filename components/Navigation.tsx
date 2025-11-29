'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let hideTimer: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Clear hide timer when scrolling
      if (hideTimer) {
        clearTimeout(hideTimer);
        hideTimer = null;
      }

      // Show navigation when at top of page
      if (currentScrollY < 50) {
        setIsNavVisible(true);
      }
      // Hide navigation when scrolling down
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavVisible(false);
      }
      // Show navigation when scrolling up
      else if (currentScrollY < lastScrollY) {
        setIsNavVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Clear existing timer
      if (hideTimer) {
        clearTimeout(hideTimer);
        hideTimer = null;
      }

      // Show navigation when mouse is near the top of the screen (within 100px)
      if (e.clientY < 100) {
        setIsNavVisible(true);
      }
      // If mouse moved away from top and we're scrolled down, set timer to hide after 200ms
      else if (e.clientY >= 100 && window.scrollY > 100) {
        hideTimer = setTimeout(() => {
          setIsNavVisible(false);
        }, 200);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      if (hideTimer) {
        clearTimeout(hideTimer);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lastScrollY]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/people', label: 'People' },
    { href: '/research', label: 'Research' },
    { href: '/publications', label: 'Publications' },
    { href: '/news', label: 'News' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact Us' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass shadow-lg py-4'
          : 'bg-transparent py-6'
      } ${
        isNavVisible
          ? 'translate-y-0'
          : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="h-14 transform group-hover:scale-105 transition-transform duration-300">
              <img
                src="/assets/scaleml-logo.svg"
                alt="ScaleML Lab"
                className="h-full w-auto"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-300 transition-colors duration-200 font-medium relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>
            <ThemeToggle />
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle variant="compact" />
            <button
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 animate-slide-up glass rounded-2xl px-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
