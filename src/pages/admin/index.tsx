import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Link from 'next/link';
import Image from 'next/image';

const AdminDashboard: React.FC = () => {
  const { user, loading } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const router = useRouter();
  
  useEffect(() => {
    // Redirect if user is not logged in or not an admin
    if (!loading && (!user || user.role !== 'ADMIN')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg-primary">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00D9CF] dark:border-dark-brand-turquoise"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-dark-bg-primary transition-colors duration-200 ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="bg-white dark:bg-dark-bg-secondary shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-10 w-32 relative">
              <Image 
                src="/images/oraluirobert_logo.png" 
                alt="Logo" 
                layout="fill" 
                objectFit="contain" 
              />
            </div>
            <h1 className="ml-4 text-xl font-bold text-gray-900 dark:text-dark-text-primary">Admin Dashboard</h1>
          </div>
          <div className="flex items-center">
            <span className="mr-4 text-gray-700 dark:text-dark-text-secondary">
              {user.name} ({user.email})
            </span>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md bg-gray-100 dark:bg-dark-bg-tertiary text-gray-700 dark:text-dark-text-primary hover:bg-gray-200 dark:hover:bg-dark-bg-tertiary/80 transition-colors"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex space-x-8">
            <Link href="/admin" className="border-[#00D9CF] dark:border-dark-brand-turquoise text-[#00D9CF] dark:text-dark-brand-turquoise whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
              Dashboard
            </Link>
            <Link href="/admin/applications" className="border-transparent text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-border whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
              Applications
            </Link>
            <Link href="/admin/users" className="border-transparent text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-border whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
              Users
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-dark-bg-secondary shadow overflow-hidden sm:rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-text-primary mb-4">Welcome to the Admin Dashboard</h2>
          <p className="text-gray-600 dark:text-dark-text-secondary">
            Use the tabs above to navigate to different sections of the admin dashboard.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-[#00D9CF]/10 dark:bg-dark-brand-turquoise/10 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-[#00D9CF] dark:text-dark-brand-turquoise">Applications</h3>
              <p className="mt-1 text-gray-600 dark:text-dark-text-secondary">
                Review and manage volunteer applications.
              </p>
              <div className="mt-4">
                <Link href="/admin/applications" className="text-[#00D9CF] dark:text-dark-brand-turquoise font-medium hover:text-[#00C5E3] dark:hover:text-dark-brand-teal">
                  View Applications →
                </Link>
              </div>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/10 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-purple-600 dark:text-purple-400">Users</h3>
              <p className="mt-1 text-gray-600 dark:text-dark-text-secondary">
                Manage user accounts and permissions.
              </p>
              <div className="mt-4">
                <Link href="/admin/users" className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300">
                  Manage Users →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard; 