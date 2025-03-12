import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useTheme } from '../../context/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { darkMode } = useTheme();
  
  return (
    <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
      <Sidebar />
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
