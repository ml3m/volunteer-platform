import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  HomeIcon, UserIcon, UsersIcon, DocumentTextIcon, 
  BellIcon, QuestionMarkCircleIcon, DocumentDuplicateIcon,
  GiftIcon, CircleStackIcon, Cog6ToothIcon, BookOpenIcon,
  ChartBarIcon, UserPlusIcon, QrCodeIcon
} from '@heroicons/react/24/outline';


const Sidebar: React.FC = () => {
  const [dashboardOpen, setDashboardOpen] = useState(true);
  const [volunteersOpen, setVolunteersOpen] = useState(false);
  const [documentsOpen, setDocumentsOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Mock user data - in a real app, this would come from authentication
  const user = {
    name: 'Beth Julca',
    email: 'beth@pointapp.org',
    role: 'Admin' // or 'Volunteer'
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
              src="https://randomuser.me/api/portraits/women/81.jpg" 
              alt={user.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=2AADE3&color=fff`;
              }}
            />
          </div>
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
            <div className="text-xs px-2 py-0.5 bg-[#00D9CF] text-white rounded-full inline-block mt-1">{user.role}</div>
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
            href="/" 
            hasDropdown 
            isOpen={dashboardOpen}
            onClick={() => setDashboardOpen(!dashboardOpen)}
            active
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
            href="/volunteers" 
            hasDropdown
            isOpen={volunteersOpen}
            onClick={() => setVolunteersOpen(!volunteersOpen)}
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
            href="/applications" 
          />
          
          <NavItem 
            icon={<DocumentTextIcon className="w-5 h-5" />} 
            label="Documents" 
            href="/documents"
            hasDropdown
            isOpen={documentsOpen}
            onClick={() => setDocumentsOpen(!documentsOpen)}
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
            href="/scanner" 
          />
          
          <NavItem 
            icon={<BellIcon className="w-5 h-5" />} 
            label="Reminders" 
            href="/reminders"
            hasDropdown
            isOpen={eventsOpen}
            onClick={() => setEventsOpen(!eventsOpen)}
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
            href="/recognition" 
          />
          
          <NavItem 
            icon={<DocumentDuplicateIcon className="w-5 h-5" />} 
            label="Requests" 
            href="/requests" 
          />
          
          <NavItem 
            icon={<CircleStackIcon className="w-5 h-5" />} 
            label="Database" 
            href="/database" 
          />
          
          <NavItem 
            icon={<ChartBarIcon className="w-5 h-5" />} 
            label="Reports" 
            href="/reports" 
          />
          
          <NavItem 
            icon={<Cog6ToothIcon className="w-5 h-5" />} 
            label="Settings" 
            href="/settings"
            hasDropdown
            isOpen={settingsOpen}
            onClick={() => setSettingsOpen(!settingsOpen)}
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
            href="/documentation" 
          />
          
          <NavItem 
            icon={<QuestionMarkCircleIcon className="w-5 h-5" />} 
            label="Support" 
            href="/support" 
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
  href: string;
  hasDropdown?: boolean;
  active?: boolean;
  isOpen?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ 
  icon, 
  label, 
  href, 
  hasDropdown = false, 
  active = false,
  isOpen = false,
  onClick
}) => {
  return (
    <li>
      <Link 
        href={href} 
        className={`flex items-center justify-between py-2 px-4 rounded-md ${
          active 
            ? 'text-[#00D9CF] dark:text-dark-brand-turquoise' 
            : 'text-gray-600 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary'
        } transition-colors`}
        onClick={(e) => {
          if (hasDropdown && onClick) {
            e.preventDefault();
            onClick();
          }
        }}
      >
        <div className="flex items-center space-x-3">
          {icon}
          <span>{label}</span>
        </div>
        {hasDropdown && (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        )}
      </Link>
    </li>
  );
};

export default Sidebar;
