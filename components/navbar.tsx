'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/providers/language-provider';
import LanguageSwitcher from './language-switcher';
import Image from 'next/image';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 20);

      if (isMobileMenuOpen) {
        setIsVisible(true);
        lastScrollY.current = currentY;
        return;
      }

      if (currentY < 50) {
        setIsVisible(true);
      } else if (currentY > lastScrollY.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  const { t } = useLanguage();
  const menuItems = [
    { label: t('home'), href: '#home' },
    { label: t('about'), href: '#about' },
    { label: t('services'), href: '#services' },
    { label: t('gallery'), href: '#gallery' },
    { label: t('clients'), href: '#clients' },
    { label: t('contact'), href: '#contact' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transform transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${isScrolled ? 'bg-sky-400 shadow-lg' : 'bg-sky-400/95'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a href="#home" className="flex items-center" onClick={(e) => scrollToSection(e, '#home')}>
            <img
              src="/placeholder.svg?height=80&width=80"
              alt="INL logo"
              className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 object-contain"
            />
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="text-white hover:text-sky-800 transition-colors duration-200 font-medium"
              >
                {item.label}
              </a>
            ))}
            <LanguageSwitcher />
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#002147] border-t border-sky-900">
          <div className="px-4 py-4 space-y-3">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="block text-white hover:text-sky-400 transition-colors duration-200 py-2"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
