import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Link from 'next/link';
import Image from 'next/image';
import ApplicationsContent from '~/components/dashboard/ApplicationsContent';

const ApplicationsPage: React.FC = () => {
  const { user, loading } = useAuth();
  const { darkMode } = useTheme();
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
    <DashboardLayout initialContent="applications">
      <ApplicationsContent />
    </DashboardLayout>
  );
};

export default ApplicationsPage; 
