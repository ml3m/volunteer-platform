import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from './Header';
import Sidebar from './Sidebar';
import StatsCards from '~/components/dashboard/StatsCards';
import EmployeeActivityCharts from '~/components/dashboard/EmployeeActivityCharts';
import TopEmployees from '~/components/dashboard/TopEmployees';
import EventAttendanceChart from '~/components/dashboard/EventAttendanceChart';
import ApplicationsContent from '~/components/dashboard/ApplicationsContent';

// Define the content types that can be displayed in the main area
type ContentType = 'dashboard' | 'volunteers' | 'applications' | 'documents' | 'scanner' | 
                  'reminders' | 'recognition' | 'requests' | 'database' | 'reports' | 
                  'settings' | 'documentation' | 'support';

interface DashboardLayoutProps {
  children?: React.ReactNode;
  initialContent?: ContentType;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, initialContent = 'dashboard' }) => {
  const router = useRouter();
  const [activeContent, setActiveContent] = useState<ContentType>(initialContent);

  // Set initial active content based on route if provided
  useEffect(() => {
    // Check the current route and set the appropriate content type
    const path = router.pathname;
    
    if (path.includes('/admin/applications')) {
      console.log('Setting active content to applications based on URL');
      setActiveContent('applications');
    } else if (path.includes('/admin/volunteers')) {
      setActiveContent('volunteers');
    } else if (path.includes('/admin/documents')) {
      setActiveContent('documents');
    }
    // Add more route mappings as needed
  }, [router.pathname]);

  // This effect runs when initialContent changes (like when we pass it as a prop)
  useEffect(() => {
    if (initialContent && initialContent !== activeContent) {
      console.log(`Setting active content to ${initialContent} from prop`);
      setActiveContent(initialContent);
    }
  }, [initialContent]);

  const handleNavigate = (contentType: ContentType) => {
    console.log(`DashboardLayout handleNavigate called with: ${contentType}`);
    setActiveContent(contentType);
    
    // For certain content types, navigate to their dedicated pages
    if (contentType === 'applications') {
      router.push('/admin/applications');
    } else if (contentType === 'dashboard') {
      router.push('/admin');
    }
    // Add other navigation cases as needed
  };

  const renderContent = () => {
    console.log(`Rendering content for: ${activeContent}`);
    
    switch (activeContent) {
      case 'dashboard':
        return children || (
          <div className="space-y-6">
            <StatsCards />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <EmployeeActivityCharts />
              </div>
              <div>
                <TopEmployees />
              </div>
            </div>
            <EventAttendanceChart />
          </div>
        );
      case 'applications':
        return <ApplicationsContent />;
      // Add other cases for different content types
      default:
        return <div className="p-6 bg-white dark:bg-dark-bg-secondary rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Content for {activeContent}</h2>
          <p>This section is not implemented yet.</p>
        </div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-dark-bg-primary transition-colors duration-200">
      <Sidebar onNavigate={handleNavigate} activeContent={activeContent} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
