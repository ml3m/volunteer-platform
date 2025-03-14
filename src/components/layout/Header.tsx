// src/components/layout/Header.tsx
import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, logout } = useAuth();

  return (
    <header className="bg-white dark:bg-dark-bg-secondary border-b border-gray-200 dark:border-dark-border p-4 transition-colors duration-200">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-dark-text-primary">Volunteer Stats</h1>
        <div className="flex items-center space-x-2">
          <div className="mr-4 text-sm text-gray-600 dark:text-dark-text-secondary">
            <span className="font-medium text-gray-800 dark:text-dark-text-primary">{user?.name}</span>
            <span className="mx-1">•</span>
            <span className="px-2 py-0.5 bg-[#00D9CF] dark:bg-dark-brand-turquoise text-white rounded-full text-xs">
              {user?.role}
            </span>
          </div>
          
          <button 
            className="flex items-center space-x-2 py-2 px-4 border border-gray-300 dark:border-dark-border rounded-md bg-white dark:bg-dark-bg-tertiary hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary/80 text-gray-700 dark:text-dark-text-primary transition-colors"
            onClick={() => alert('Export functionality would go here')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span>Export</span>
          </button>
          
          <button
            onClick={toggleDarkMode}
            className="w-8 h-8 rounded-md flex items-center justify-center text-gray-700 dark:text-dark-text-primary hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary transition-colors"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? (
              <SunIcon className="w-5 h-5" />
            ) : (
              <MoonIcon className="w-5 h-5" />
            )}
          </button>
          
          <button
            onClick={logout}
            className="ml-2 py-2 px-4 border border-gray-300 dark:border-dark-border rounded-md bg-white dark:bg-dark-bg-tertiary hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary/80 text-gray-700 dark:text-dark-text-primary transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
