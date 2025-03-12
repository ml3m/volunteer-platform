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
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
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
          'rgba(75, 192, 75, 0.8)',
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
          'rgba(255, 159, 64, 0.8)',
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
          'rgba(54, 162, 235, 0.8)',
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
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center mb-4">
          <h3 className="text-lg font-medium text-gray-800">EMPLOYEE AGES</h3>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="h-64">
          <Doughnut data={ageData} options={{ ...options, maintainAspectRatio: false }} />
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center mb-4">
          <h3 className="text-lg font-medium text-gray-800">EMPLOYEE EVENT ACTIVITY</h3>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex justify-around h-64">
          <div className="relative w-1/3 flex items-center justify-center">
            <div className="w-32 h-32">
              <Doughnut data={activityData1} options={options} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">78%</span>
            </div>
          </div>
          <div className="relative w-1/3 flex items-center justify-center">
            <div className="w-32 h-32">
              <Doughnut data={activityData2} options={options} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">78%</span>
            </div>
          </div>
          <div className="relative w-1/3 flex items-center justify-center">
            <div className="w-32 h-32">
              <Doughnut data={activityData3} options={options} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">60%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeActivityCharts;
