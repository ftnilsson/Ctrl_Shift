"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/features/theme/ThemeContext';

const Header: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Schedules', href: '/shifts' },
    { label: 'Teams', href: '/teams' },
    { label: 'Reports', href: '/reports' },
    { label: 'Support Heroes', href: '/support-superhero' }
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`${theme === 'dark' ? 'bg-indigo-800' : 'bg-indigo-600'} text-white p-4 shadow-md transition-colors`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Ctrl+Shift</Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <ul className="flex space-x-6">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link 
                  href={item.href} 
                  className={`hover:underline ${pathname === item.href ? 'font-medium border-b-2 border-white' : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Theme toggle button */}
          <button 
            onClick={toggleTheme}
            className={`ml-6 p-2 rounded-full ${theme === 'dark' ? 'hover:bg-indigo-900' : 'hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-white transition-colors`}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </nav>
        
        {/* Mobile Menu Button and Theme Toggle */}
        <div className="md:hidden flex items-center">
          {/* Theme toggle button for mobile */}
          <button 
            onClick={toggleTheme}
            className={`mr-4 p-2 rounded-full ${theme === 'dark' ? 'hover:bg-indigo-900' : 'hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-white transition-colors`}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          
          {/* Mobile menu hamburger button */}
          <button 
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4">
          <ul className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link 
                  href={item.href} 
                  className={`block px-4 py-2 ${theme === 'dark' ? 'hover:bg-indigo-900' : 'hover:bg-indigo-700'} rounded transition-colors ${pathname === item.href ? `font-medium ${theme === 'dark' ? 'bg-indigo-900' : 'bg-indigo-700'}` : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;