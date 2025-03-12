import React, { useState } from 'react';
import { useAuth } from '~/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { 
  HomeIcon, UserIcon, UsersIcon, DocumentTextIcon, 
  BellIcon, QuestionMarkCircleIcon, DocumentDuplicateIcon,
  GiftIcon, CircleStackIcon, Cog6ToothIcon, BookOpenIcon,
  ChartBarIcon, UserPlusIcon, QrCodeIcon
} from '@heroicons/react/24/outline';

// Define the content types that can be displayed in the main area
type ContentType = 'dashboard' | 'volunteers' | 'applications' | 'documents' | 'scanner' | 
                  'reminders' | 'recognition' | 'requests' | 'database' | 'reports' | 
                  'settings' | 'documentation' | 'support';

// Define the role-based access map - each tab can have multiple roles that can access it
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

interface SidebarProps {
  onNavigate?: (contentType: ContentType) => void;
  activeContent?: ContentType;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate, activeContent = 'dashboard' }) => {
  const [dashboardOpen, setDashboardOpen] = useState(true);
  const [volunteersOpen, setVolunteersOpen] = useState(false);
  const [documentsOpen, setDocumentsOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const { user } = useAuth();

  // Function to check if a user has access to a specific tab
  const hasAccess = (contentType: ContentType): boolean => {
    // If no user is logged in or no role is defined, default to no access
    if (!user || !user.role) {
      return false;
    }
    
    // Check if the user's role is in the list of allowed roles for this content type
    return roleBasedAccessMap[contentType].includes(user.role);
  };

  // Function to handle navigation
  const handleNavigation = (contentType: ContentType) => {
    console.log(`Sidebar handleNavigation called with: ${contentType}`);
    console.log(`onNavigate prop exists: ${!!onNavigate}`);
    
    if (onNavigate) {
      onNavigate(contentType);
    }
  };

  return (
    <div className="w-64 bg-white dark:bg-dark-bg-secondary border-r border-gray-200 dark:border-dark-border flex flex-col transition-colors duration-200">
      <div className="p-4 border-b border-gray-200 dark:border-dark-border">
        <div className="h-10 relative">
          <Image 
            src="/images/oraluirobert_logo.png" 
            alt="Logo" 
            layout="fill" 
            objectFit="contain" 
            objectPosition="left"
          />
        </div>
        <div className="flex items-center mt-4 space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            <img 
              src={`https://ui-avatars.com/api/?name=${user?.name.replace(' ', '+') || 'User'}&background=2AADE3&color=fff`}
              alt={user?.name || 'User'} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-medium text-gray-800 dark:text-dark-text-primary">{user?.name || 'User'}</div>
            <div className="text-sm text-gray-500 dark:text-dark-text-secondary">{user?.email || 'user@example.com'}</div>
            <div className="text-xs px-2 py-0.5 bg-[#00D9CF] dark:bg-dark-brand-turquoise text-white rounded-full inline-block mt-1">
              {user?.role || 'VOLUNTEER'}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <button className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-[#00D9CF] rounded-md text-[#00D9CF] hover:bg-[#00D9CF]/10 transition-colors dark:border-dark-border">
          <span>+</span>
          <span>Quick Add</span>
        </button>
      </div>
      
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-2">
          <NavItem 
            icon={<HomeIcon className="w-5 h-5" />} 
            label="Dashboard" 
            contentType="dashboard"
            hasDropdown 
            isOpen={dashboardOpen}
            onClick={() => setDashboardOpen(!dashboardOpen)}
            active={activeContent === 'dashboard'}
            onNavigate={handleNavigation}
            hasAccess={hasAccess('dashboard')}
          />
          
          {dashboardOpen && (
            <>
              <li className="pl-10 py-2 text-[#00D9CF] font-medium cursor-pointer hover:bg-gray-100 rounded-md">Volunteer Stats</li>
              <li className="pl-10 py-2 text-gray-600 cursor-pointer hover:bg-gray-100 rounded-md">Activity Overview</li>
            </>
          )}
          
          <NavItem 
            icon={<UsersIcon className="w-5 h-5" />} 
            label="Volunteers" 
            contentType="volunteers"
            hasDropdown
            isOpen={volunteersOpen}
            onClick={() => setVolunteersOpen(!volunteersOpen)}
            active={activeContent === 'volunteers'}
            onNavigate={handleNavigation}
            hasAccess={hasAccess('volunteers')}
          />
          
          {volunteersOpen && (
            <>
              <li className="pl-10 py-2 text-gray-600 cursor-pointer hover:bg-gray-100 rounded-md">All Volunteers</li>
              <li className="pl-10 py-2 text-gray-600 cursor-pointer hover:bg-gray-100 rounded-md">External Support</li>
              <li className="pl-10 py-2 text-gray-600 cursor-pointer hover:bg-gray-100 rounded-md">Recognition Cards</li>
            </>
          )}
          
          {/* Only show Applications tab to admin users */}
          {hasAccess('applications') && (
            <NavItem 
              icon={<UserPlusIcon className="w-5 h-5" />} 
              label="Applications" 
              contentType="applications"
              active={activeContent === 'applications'}
              onNavigate={handleNavigation}
              hasAccess={hasAccess('applications')}
            />
          )}
          
          <NavItem 
            icon={<DocumentTextIcon className="w-5 h-5" />} 
            label="Documents" 
            contentType="documents"
            hasDropdown
            isOpen={documentsOpen}
            onClick={() => setDocumentsOpen(!documentsOpen)}
            active={activeContent === 'documents'}
            onNavigate={handleNavigation}
            hasAccess={hasAccess('documents')}
          />
          
          {documentsOpen && (
            <>
              <li className="pl-10 py-2 text-gray-600 cursor-pointer hover:bg-gray-100 rounded-md">Document Requests</li>
              <li className="pl-10 py-2 text-gray-600 cursor-pointer hover:bg-gray-100 rounded-md">Expense Reports</li>
              <li className="pl-10 py-2 text-gray-600 cursor-pointer hover:bg-gray-100 rounded-md">Generated PDFs</li>
            </>
          )}
          
          <NavItem 
            icon={<QrCodeIcon className="w-5 h-5" />} 
            label="Document Scanner" 
            contentType="scanner"
            active={activeContent === 'scanner'}
            onNavigate={handleNavigation}
            hasAccess={hasAccess('scanner')}
          />
          
          <NavItem 
            icon={<BellIcon className="w-5 h-5" />} 
            label="Reminders" 
            contentType="reminders"
            hasDropdown
            isOpen={eventsOpen}
            onClick={() => setEventsOpen(!eventsOpen)}
            active={activeContent === 'reminders'}
            onNavigate={handleNavigation}
            hasAccess={hasAccess('reminders')}
          />
          
          {eventsOpen && (
            <>
              <li className="pl-10 py-2 text-gray-600 cursor-pointer hover:bg-gray-100 rounded-md">Upcoming Events</li>
              <li className="pl-10 py-2 text-gray-600 cursor-pointer hover:bg-gray-100 rounded-md">My Calendar</li>
            </>
          )}
          
          <NavItem 
            icon={<GiftIcon className="w-5 h-5" />} 
            label="Recognition" 
            contentType="recognition"
            active={activeContent === 'recognition'}
            onNavigate={handleNavigation}
            hasAccess={hasAccess('recognition')}
          />
          
          <NavItem 
            icon={<DocumentDuplicateIcon className="w-5 h-5" />} 
            label="Requests" 
            contentType="requests"
            active={activeContent === 'requests'}
            onNavigate={handleNavigation}
            hasAccess={hasAccess('requests')}
          />
          
          {/* Only show Database tab to admin users */}
          {hasAccess('database') && (
            <NavItem 
              icon={<CircleStackIcon className="w-5 h-5" />} 
              label="Database" 
              contentType="database"
              active={activeContent === 'database'}
              onNavigate={handleNavigation}
              hasAccess={hasAccess('database')}
            />
          )}
          
          <NavItem 
            icon={<ChartBarIcon className="w-5 h-5" />} 
            label="Reports" 
            contentType="reports"
            active={activeContent === 'reports'}
            onNavigate={handleNavigation}
            hasAccess={hasAccess('reports')}
          />
          
          {/* Only show Settings tab to admin users */}
          {hasAccess('settings') && (
            <NavItem 
              icon={<Cog6ToothIcon className="w-5 h-5" />} 
              label="Settings" 
              contentType="settings"
              hasDropdown
              isOpen={settingsOpen}
              onClick={() => setSettingsOpen(!settingsOpen)}
              active={activeContent === 'settings'}
              onNavigate={handleNavigation}
              hasAccess={hasAccess('settings')}
            />
          )}
          
          {settingsOpen && hasAccess('settings') && (
            <>
              <li className="pl-10 py-2 text-gray-600 cursor-pointer hover:bg-gray-100 rounded-md">User Management</li>
              <li className="pl-10 py-2 text-gray-600 cursor-pointer hover:bg-gray-100 rounded-md">Roles & Permissions</li>
              <li className="pl-10 py-2 text-gray-600 cursor-pointer hover:bg-gray-100 rounded-md">System Settings</li>
            </>
          )}
          
          <NavItem 
            icon={<BookOpenIcon className="w-5 h-5" />} 
            label="Documentation" 
            contentType="documentation"
            active={activeContent === 'documentation'}
            onNavigate={handleNavigation}
            hasAccess={hasAccess('documentation')}
          />
          
          <NavItem 
            icon={<QuestionMarkCircleIcon className="w-5 h-5" />} 
            label="Support" 
            contentType="support"
            active={activeContent === 'support'}
            onNavigate={handleNavigation}
            hasAccess={hasAccess('support')}
          />
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200 dark:border-dark-border">
        <div className="text-sm text-gray-500 dark:text-dark-text-secondary">
          <p>© 2025 oraluirobert</p>
          <p>Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  contentType: ContentType;
  hasDropdown?: boolean;
  active?: boolean;
  isOpen?: boolean;
  onClick?: () => void;
  onNavigate?: (contentType: ContentType) => void;
  hasAccess?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ 
  icon, 
  label, 
  contentType,
  hasDropdown = false, 
  active = false,
  isOpen = false,
  onClick,
  onNavigate,
  hasAccess = true
}) => {
  
  // Don't render if the user doesn't have access
  if (!hasAccess) {
    return null;
  }
  
  const handleClick = () => {
    if (hasDropdown && onClick) {
      onClick();
    } else if (onNavigate) {
      onNavigate(contentType);
    }
  };
  
  return (
    <li 
      className={`py-2 px-2 mb-1 flex items-center justify-between rounded-md cursor-pointer ${
        active ? 'text-[#00D9CF] dark:text-dark-brand-turquoise bg-[#00D9CF]/10 dark:bg-dark-brand-turquoise/10' : 'text-gray-700 dark:text-dark-text-primary hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary/20'
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center space-x-3">
        <div className="w-5 h-5">{icon}</div>
        <span>{label}</span>
      </div>
      {hasDropdown && (
        <div className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </li>
  );
};

export default Sidebar;
