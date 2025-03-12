import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';
import FilterBar from '../../components/dashboard/FilterBar';
import StatsCards from '../../components/dashboard/StatsCards';
import EventAttendanceChart from '../../components/dashboard/EventAttendanceChart';
import TopEmployees from '../../components/dashboard/TopEmployees';

const AdminDashboard: React.FC = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    console.log('AdminDashboard component mounted');
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

  // Dashboard content
  const DashboardContent = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">Welcome, admin!</h1>
        <FilterBar />
      </div>
      
      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-dark-bg-secondary p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-text-primary mb-4 flex items-center">
            EVENT ATTENDANCE ACTIVITY
            <span className="ml-2 text-gray-400 dark:text-dark-text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </span>
          </h2>
          <EventAttendanceChart />
        </div>
        
        <div className="bg-white dark:bg-dark-bg-secondary p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-text-primary mb-4 flex items-center">
            TOP EMPLOYEES
            <span className="ml-2 text-gray-400 dark:text-dark-text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </span>
          </h2>
          <TopEmployees />
        </div>
      </div>
    </div>
  );

  // Add console log before return
  console.log('Rendering AdminDashboard with DashboardLayout');
  
  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  );
};

export default AdminDashboard;
