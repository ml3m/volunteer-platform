import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';

const ApplicationsPage: React.FC = () => {
  const { user, loading } = useAuth();
  const { darkMode } = useTheme();
  const router = useRouter();

  React.useEffect(() => {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-dark-bg-secondary shadow overflow-hidden sm:rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-text-primary mb-4">Applications</h2>
          <p className="text-gray-600 dark:text-dark-text-secondary mb-4">
            This is a temporary page. Please go back to the admin dashboard.
          </p>
          <Link href="/admin" className="text-[#00D9CF] dark:text-dark-brand-turquoise font-medium hover:text-[#00C5E3] dark:hover:text-dark-brand-teal">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsPage; 