import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useTheme } from '../../context/ThemeContext';

// Define the content types that can be displayed in the main area
type ContentType = 'dashboard' | 'volunteers' | 'applications' | 'documents' | 'scanner' | 
                  'reminders' | 'recognition' | 'requests' | 'database' | 'reports' | 
                  'settings' | 'documentation' | 'support';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { darkMode } = useTheme();
  const [activeContent, setActiveContent] = useState<ContentType>('dashboard');

  const handleNavigate = (contentType: ContentType) => {
    console.log(`Layout handleNavigate called with: ${contentType}`);
    setActiveContent(contentType);
    
    // If we're in the admin section, we could also navigate to the specific page
    // This is optional and depends on how you want to handle navigation
    if (typeof window !== 'undefined') {
      if (contentType === 'applications') {
        window.location.href = '/admin/applications';
      }
      // Add other navigation cases as needed
    }
  };
  
  return (
    <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
      <Sidebar onNavigate={handleNavigate} activeContent={activeContent} />
      <div className="flex-1 flex flex-col overflow-hidden dark:bg-dark-bg-primary transition-colors duration-200">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-dark-bg-primary transition-colors duration-200">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
