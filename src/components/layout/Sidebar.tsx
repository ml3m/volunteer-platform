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
      
      <div className="p-4 border-b border-gray-200 dark:border-dark-border">
        <button 
          className="w-full flex items-center justify-between"
          onClick={() => {}}
        >
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#2AADE3] flex items-center justify-center text-white">
              DX
            </div>
            <div>
              <div className="font-medium">GnomeDX</div>
              <div className="text-xs text-gray-500">Organization</div>
            </div>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </button>
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
          />
          
          {volunteersOpen && (
            <>
              <li className="pl-10 py-2 text-gray-600 cursor-pointer hover:bg-gray-100 rounded-md">All Volunteers</li>
              <li className="pl-10 py-2 text-gray-600 cursor-pointer hover:bg-gray-100 rounded-md">External Support</li>
              <li className="pl-10 py-2 text-gray-600 cursor-pointer hover:bg-gray-100 rounded-md">Recognition Cards</li>
            </>
          )}
          
          <NavItem 
            icon={<UserPlusIcon className="w-5 h-5" />} 
            label="Applications" 
            contentType="applications"
            active={activeContent === 'applications'}
            onNavigate={handleNavigation}
          />
          
          <NavItem 
            icon={<DocumentTextIcon className="w-5 h-5" />} 
            label="Documents" 
            contentType="documents"
            hasDropdown
            isOpen={documentsOpen}
            onClick={() => setDocumentsOpen(!documentsOpen)}
            active={activeContent === 'documents'}
            onNavigate={handleNavigation}
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
          />
          
          <NavItem 
            icon={<DocumentDuplicateIcon className="w-5 h-5" />} 
            label="Requests" 
            contentType="requests"
            active={activeContent === 'requests'}
            onNavigate={handleNavigation}
          />
          
          <NavItem 
            icon={<CircleStackIcon className="w-5 h-5" />} 
            label="Database" 
            contentType="database"
            active={activeContent === 'database'}
            onNavigate={handleNavigation}
          />
          
          <NavItem 
            icon={<ChartBarIcon className="w-5 h-5" />} 
            label="Reports" 
            contentType="reports"
            active={activeContent === 'reports'}
            onNavigate={handleNavigation}
          />
          
          <NavItem 
            icon={<Cog6ToothIcon className="w-5 h-5" />} 
            label="Settings" 
            contentType="settings"
            hasDropdown
            isOpen={settingsOpen}
            onClick={() => setSettingsOpen(!settingsOpen)}
            active={activeContent === 'settings'}
            onNavigate={handleNavigation}
          />
          
          {settingsOpen && (
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
          />
          
          <NavItem 
            icon={<QuestionMarkCircleIcon className="w-5 h-5" />} 
            label="Support" 
            contentType="support"
            active={activeContent === 'support'}
            onNavigate={handleNavigation}
          />
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center space-x-2 py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md transition-colors dark:border-dark-border">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
          </svg>
          <span>Log Out</span>
        </button>
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
}

const NavItem: React.FC<NavItemProps> = ({ 
  icon, 
  label, 
  contentType,
  hasDropdown = false, 
  active = false,
  isOpen = false,
  onClick,
  onNavigate
}) => {
  const handleClick = () => {
    console.log(`NavItem clicked: ${label} (${contentType})`);
    
    if (hasDropdown && onClick) {
      console.log(`Toggling dropdown for: ${label}`);
      onClick();
    }
    
    // Always navigate when clicked, regardless of dropdown status
    if (onNavigate) {
      console.log(`Navigating to: ${contentType}`);
      onNavigate(contentType);
    }
  };

  return (
    <li>
      <button 
        onClick={handleClick}
        className={`w-full flex items-center justify-between py-2 px-3 rounded-md transition-colors ${
          active 
            ? 'text-[#00D9CF] dark:text-dark-brand-turquoise bg-[#00D9CF]/10 dark:bg-dark-brand-turquoise/10' 
            : 'text-gray-700 dark:text-dark-text-primary hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary/10'
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className="text-gray-500 dark:text-dark-text-secondary">
            {icon}
          </div>
          <span>{label}</span>
        </div>
        {hasDropdown && (
          <div className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </button>
    </li>
  );
};

export default Sidebar;
