import React from 'react';
import { UserGroupIcon, ClockIcon, CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const StatsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard 
        title="Employees Volunteered" 
        value="1649" 
        icon={<UserGroupIcon className="w-5 h-5 text-orange-500" />} 
        iconBg="bg-orange-100" 
      />
      <StatCard 
        title="Hours Volunteered" 
        value="425h 59m" 
        icon={<ClockIcon className="w-5 h-5 text-orange-500" />} 
        iconBg="bg-orange-100" 
      />
      <StatCard 
        title="Events Attended" 
        value="186" 
        icon={<CalendarIcon className="w-5 h-5 text-orange-500" />} 
        iconBg="bg-orange-100" 
      />
      <StatCard 
        title="Economic Impact" 
        value="$3,580" 
        icon={<CurrencyDollarIcon className="w-5 h-5 text-orange-500" />} 
        iconBg="bg-orange-100" 
      />
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  iconBg: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, iconBg }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center mb-4">
        <div className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center mr-2`}>
          {icon}
        </div>
        <div className="text-sm text-gray-600">{title}</div>
        <div className="ml-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-800">{value}</div>
    </div>
  );
};

export default StatsCards;
