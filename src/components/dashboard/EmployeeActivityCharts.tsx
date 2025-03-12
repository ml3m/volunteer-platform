import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const EmployeeActivityCharts: React.FC = () => {
  // Employee Ages Chart (placeholder)
  const ageData = {
    labels: ['18-25', '26-35', '36-45', '46-55', '56+'],
    datasets: [
      {
        data: [30, 50, 60, 40, 20],
        backgroundColor: [
          '#2AADE3',
          '#00C5E3',
          '#00D9CF',
          '#58EAAE',
          '#ABF489',
        ],
        borderWidth: 0,
      },
    ],
  };

  // Employee Event Activity Charts
  const activityData1 = {
    datasets: [
      {
        data: [78, 22],
        backgroundColor: [
          '#58EAAE',
          'rgba(240, 240, 240, 0.8)',
        ],
        borderWidth: 0,
        cutout: '80%',
      },
    ],
  };

  const activityData2 = {
    datasets: [
      {
        data: [78, 22],
        backgroundColor: [
          '#F9F871',
          'rgba(240, 240, 240, 0.8)',
        ],
        borderWidth: 0,
        cutout: '80%',
      },
    ],
  };

  const activityData3 = {
    datasets: [
      {
        data: [60, 40],
        backgroundColor: [
          '#2AADE3',
          'rgba(240, 240, 240, 0.8)',
        ],
        borderWidth: 0,
        cutout: '80%',
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <div className="bg-white dark:bg-dark-bg-secondary p-6 rounded-lg shadow-sm border border-transparent hover:border-[#00D9CF] dark:hover:border-dark-brand-turquoise transition-all hover:shadow-md">
        <div className="flex items-center mb-4">
          <h3 className="text-lg font-medium text-gray-800 dark:text-dark-text-primary">EMPLOYEE AGES</h3>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 dark:text-gray-500 ml-2 cursor-pointer hover:text-[#00D9CF] dark:hover:text-dark-brand-turquoise" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="h-64">
          <Doughnut data={ageData} options={{ ...options, maintainAspectRatio: false }} />
        </div>
      </div>
      
      <div className="bg-white dark:bg-dark-bg-secondary p-6 rounded-lg shadow-sm border border-transparent hover:border-[#00D9CF] dark:hover:border-dark-brand-turquoise transition-all hover:shadow-md">
        <div className="flex items-center mb-4">
          <h3 className="text-lg font-medium text-gray-800 dark:text-dark-text-primary">EMPLOYEE EVENT ACTIVITY</h3>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 dark:text-gray-500 ml-2 cursor-pointer hover:text-[#00D9CF] dark:hover:text-dark-brand-turquoise" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex justify-around h-64">
          <div className="relative w-1/3 flex items-center justify-center">
            <div className="w-32 h-32">
              <Doughnut data={activityData1} options={options} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-800 dark:text-dark-text-primary">78%</span>
            </div>
          </div>
          <div className="relative w-1/3 flex items-center justify-center">
            <div className="w-32 h-32">
              <Doughnut data={activityData2} options={options} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-800 dark:text-dark-text-primary">78%</span>
            </div>
          </div>
          <div className="relative w-1/3 flex items-center justify-center">
            <div className="w-32 h-32">
              <Doughnut data={activityData3} options={options} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-800 dark:text-dark-text-primary">60%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeActivityCharts;
