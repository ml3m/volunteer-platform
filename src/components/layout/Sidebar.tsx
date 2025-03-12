import React from 'react';
import Link from 'next/link';
import { 
  HomeIcon, BellIcon, BuildingOfficeIcon, UserGroupIcon, 
  ChatBubbleLeftRightIcon, ChartBarIcon, CalendarIcon,
  Cog6ToothIcon, TicketIcon, QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="text-2xl font-bold text-orange-500">POINT</div>
        <div className="flex items-center mt-4 space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            <img src="/avatar-placeholder.png" alt="User" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="font-medium">Beth Julca</div>
            <div className="text-sm text-gray-500">beth@pointapp.org</div>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
              DX
            </div>
            <div>
              <div className="font-medium">GnomeDX</div>
              <div className="text-xs text-gray-500">Business</div>
            </div>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <button className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-orange-300 rounded-md text-orange-500 hover:bg-orange-50">
          <span>+</span>
          <span>Quick Add</span>
        </button>
      </div>
      
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-2">
          <NavItem icon={<HomeIcon className="w-5 h-5" />} label="Home" href="/" />
          <NavItem icon={<BellIcon className="w-5 h-5" />} label="Notifications" href="/notifications" />
          <NavItem icon={<BuildingOfficeIcon className="w-5 h-5" />} label="Organization" href="/organization" hasDropdown />
          <NavItem icon={<UserGroupIcon className="w-5 h-5" />} label="People" href="/people" hasDropdown />
          <NavItem icon={<ChatBubbleLeftRightIcon className="w-5 h-5" />} label="Communicate" href="/communicate" hasDropdown />
          <NavItem icon={<ChartBarIcon className="w-5 h-5" />} label="Report" href="/report" hasDropdown active />
          
          <li className="pl-10 py-2 text-orange-500 font-medium">Volunteer Stats</li>
          <li className="pl-10 py-2 text-gray-600">Donation Stats</li>
          
          <NavItem icon={<CalendarIcon className="w-5 h-5" />} label="Volunteer" href="/volunteer" hasDropdown />
          <NavItem icon={<Cog6ToothIcon className="w-5 h-5" />} label="Settings" href="/settings" hasDropdown />
          <NavItem icon={<TicketIcon className="w-5 h-5" />} label="Subscription" href="/subscription" />
          <NavItem icon={<QuestionMarkCircleIcon className="w-5 h-5" />} label="Support" href="/support" />
        </ul>
      </nav>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  hasDropdown?: boolean;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, href, hasDropdown = false, active = false }) => {
  return (
    <li>
      <Link href={href} className={`flex items-center justify-between py-2 px-4 rounded-md ${active ? 'text-orange-500' : 'text-gray-600 hover:bg-gray-100'}`}>
        <div className="flex items-center space-x-3">
          {icon}
          <span>{label}</span>
        </div>
        {hasDropdown && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        )}
      </Link>
    </li>
  );
};

export default Sidebar;
