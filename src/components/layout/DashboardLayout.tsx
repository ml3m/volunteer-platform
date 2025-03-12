import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '~/context/AuthContext';
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

// Define the role-based access map - each tab can have multiple roles that can access it
// This should be the same as in Sidebar.tsx
const roleBasedAccessMap: Record<ContentType, string[]> = {
  dashboard: ['ADMIN', 'VOLUNTEER', 'COORDINATOR'], // Everyone can access
  volunteers: ['ADMIN', 'COORDINATOR'],
  applications: ['ADMIN'], // Only admins can access Applications
  documents: ['ADMIN', 'VOLUNTEER', 'COORDINATOR'],
  scanner: ['ADMIN', 'VOLUNTEER', 'COORDINATOR'],
  reminders: ['ADMIN', 'VOLUNTEER', 'COORDINATOR'],
  recognition: ['ADMIN', 'VOLUNTEER', 'COORDINATOR'],
  requests: ['ADMIN', 'VOLUNTEER', 'COORDINATOR'],
  database: ['ADMIN'], // Only admins can access database
  reports: ['ADMIN', 'COORDINATOR'],
  settings: ['ADMIN'], // Only admins can access settings
  documentation: ['ADMIN', 'VOLUNTEER', 'COORDINATOR'],
  support: ['ADMIN', 'VOLUNTEER', 'COORDINATOR']
};

interface DashboardLayoutProps {
  children?: React.ReactNode;
  initialContent?: ContentType;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, initialContent = 'dashboard' }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [activeContent, setActiveContent] = useState<ContentType>(initialContent);
  const [accessDenied, setAccessDenied] = useState(false);

  // Function to check if a user has access to a specific content type
  const hasAccess = (contentType: ContentType): boolean => {
    // If no user is logged in or no role is defined, default to no access
    if (!user || !user.role) {
      return false;
    }
    
    // Check if the user's role is in the list of allowed roles for this content type
    return roleBasedAccessMap[contentType].includes(user.role);
  };

  // Set initial active content based on route if provided
  useEffect(() => {
    // Check the current route and set the appropriate content type
    const path = router.pathname;
    let contentType: ContentType | null = null;
    
    if (path.includes('/admin/applications')) {
      console.log('Setting active content to applications based on URL');
      contentType = 'applications';
    } else if (path.includes('/admin/volunteers')) {
      contentType = 'volunteers';
    } else if (path.includes('/admin/documents')) {
      contentType = 'documents';
    } else if (path.includes('/admin')) {
      contentType = 'dashboard';
    }
    // Add more route mappings as needed
    
    // If we have a content type and the user has access to it, set it as active
    if (contentType) {
      if (hasAccess(contentType)) {
        setActiveContent(contentType);
      } else {
        console.log(`User does not have access to ${contentType}, redirecting to dashboard`);
        setAccessDenied(true);
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          router.push('/admin');
          setAccessDenied(false);
        }, 3000);
      }
    }
  }, [router.pathname, user]);

  // This effect runs when initialContent changes (like when we pass it as a prop)
  useEffect(() => {
    if (initialContent && initialContent !== activeContent) {
      // Only set active content if user has access to it
      if (hasAccess(initialContent)) {
        console.log(`Setting active content to ${initialContent} from prop`);
        setActiveContent(initialContent);
      } else {
        console.log(`User does not have access to ${initialContent}`);
        // If no access, default to dashboard or another accessible content
        setActiveContent('dashboard');
      }
    }
  }, [initialContent, user]);

  const handleNavigate = (contentType: ContentType) => {
    console.log(`DashboardLayout handleNavigate called with: ${contentType}`);
    
    // Check if user has access to this content type
    if (!hasAccess(contentType)) {
      console.log(`User does not have access to ${contentType}`);
      return;
    }
    
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
    
    // If access is denied, show access denied message
    if (accessDenied) {
      return (
        <div className="bg-red-100 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 text-red-700 dark:text-red-400 p-6 rounded-md">
          <h2 className="text-xl font-bold mb-2">Access Denied</h2>
          <p>You do not have permission to view this page. Redirecting to dashboard...</p>
        </div>
      );
    }
    
    // Make sure user has access to the current active content
    if (!hasAccess(activeContent)) {
      return (
        <div className="bg-red-100 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 text-red-700 dark:text-red-400 p-6 rounded-md">
          <h2 className="text-xl font-bold mb-2">Access Denied</h2>
          <p>You do not have permission to view this content.</p>
        </div>
      );
    }
    
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
        // Applications is already protected in the component itself
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
