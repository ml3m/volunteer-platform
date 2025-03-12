import React, { useState } from 'react';

const FilterBar: React.FC = () => {
  const [eventFilter, setEventFilter] = useState('all');
  const [dateRange, setDateRange] = useState('Jul 10, 2022 - Jul 10, 2023');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="flex-1 min-w-[200px]">
        <div className="text-sm text-gray-600 mb-1">View events hosted by:</div>
        <div className="flex">
          <button 
            className={`py-2 px-4 rounded-l-md border border-gray-300 dark:border-dark-border transition-colors ${
              eventFilter === 'all' 
                ? 'bg-[#2AADE3] dark:bg-dark-brand-blue text-white border-[#2AADE3] dark:border-dark-brand-blue' 
                : 'bg-white dark:bg-dark-bg-tertiary text-gray-800 dark:text-dark-text-primary hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary/80'
            }`}
            onClick={() => setEventFilter('all')}
          >
            All Events
          </button>
          <button 
            className={`py-2 px-4 rounded-r-md border border-gray-300 dark:border-dark-border border-l-0 transition-colors ${
              eventFilter === 'hosted' 
                ? 'bg-[#2AADE3] dark:bg-dark-brand-blue text-white border-[#2AADE3] dark:border-dark-brand-blue' 
                : 'bg-white dark:bg-dark-bg-tertiary text-gray-800 dark:text-dark-text-primary hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary/80'
            }`}
            onClick={() => setEventFilter('hosted')}
          >
            Events You Hosted
          </button>
        </div>
      </div>
      
      <div className="flex-1 min-w-[200px]">
        <div className="text-sm text-gray-600 mb-1">Date range</div>
        <div className="relative">
          <select 
            className="w-full py-2 px-4 border border-gray-300 dark:border-dark-border rounded-md appearance-none bg-white dark:bg-dark-bg-tertiary text-gray-800 dark:text-dark-text-primary cursor-pointer hover:border-[#00C5E3] dark:hover:border-dark-brand-teal transition-colors"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="Jul 10, 2022 - Jul 10, 2023">Jul 10, 2022 - Jul 10, 2023</option>
            <option value="Jan 1, 2023 - Dec 31, 2023">Jan 1, 2023 - Dec 31, 2023</option>
            <option value="Last 30 days">Last 30 days</option>
            <option value="Last 90 days">Last 90 days</option>
            <option value="This year">This year</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="flex-1 min-w-[200px]">
        <div className="text-sm text-gray-600 mb-1">Select groups</div>
        <div className="relative">
          <select 
            className="w-full py-2 px-4 border border-gray-300 dark:border-dark-border rounded-md appearance-none bg-white dark:bg-dark-bg-tertiary text-gray-800 dark:text-dark-text-primary cursor-pointer hover:border-[#00C5E3] dark:hover:border-dark-brand-teal transition-colors"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Marketing">Marketing</option>
            <option value="Engineering">Engineering</option>
            <option value="Sales">Sales</option>
            <option value="Customer Support">Customer Support</option>
            <option value="Human Resources">Human Resources</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="flex-1 min-w-[200px]">
        <div className="text-sm text-gray-600 mb-1">Select Program</div>
        <div className="relative">
          <select 
            className="w-full py-2 px-4 border border-gray-300 dark:border-dark-border rounded-md appearance-none bg-white dark:bg-dark-bg-tertiary text-gray-800 dark:text-dark-text-primary cursor-pointer hover:border-[#00C5E3] dark:hover:border-dark-brand-teal transition-colors"
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Community Outreach">Community Outreach</option>
            <option value="Environmental">Environmental</option>
            <option value="Education">Education</option>
            <option value="Health & Wellness">Health & Wellness</option>
            <option value="Animal Welfare">Animal Welfare</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
