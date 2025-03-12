import React from 'react';

const FilterBar: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="flex-1 min-w-[200px]">
        <div className="text-sm text-gray-600 mb-1">View events hosted by:</div>
        <div className="flex">
          <button className="py-2 px-4 bg-gray-100 text-gray-800 rounded-l-md border border-gray-300">
            All Events
          </button>
          <button className="py-2 px-4 text-gray-800 rounded-r-md border border-gray-300 border-l-0">
            Events You Hosted
          </button>
        </div>
      </div>
      
      <div className="flex-1 min-w-[200px]">
        <div className="text-sm text-gray-600 mb-1">Date range</div>
        <div className="relative">
          <select className="w-full py-2 px-4 border border-gray-300 rounded-md appearance-none bg-white">
            <option>Jul 10, 2022 - Jul 10, 2023</option>
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
          <select className="w-full py-2 px-4 border border-gray-300 rounded-md appearance-none bg-white">
            <option>Select</option>
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
          <select className="w-full py-2 px-4 border border-gray-300 rounded-md appearance-none bg-white">
            <option>Select</option>
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
