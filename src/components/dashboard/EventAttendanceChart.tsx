import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const EventAttendanceChart: React.FC = () => {
  const labels = ['07/10', '08/10', '09/10', '10/10', '11/10', '12/10', '01/10', '02/10', '03/10', '04/10', '05/10', '06/10'];
  
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Volunteers Signed Up',
        data: [50, 55, 60, 65, 75, 80, 75, 70, 75, 80, 85, 100],
        borderColor: 'rgba(255, 206, 86, 0.7)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        tension: 0.4,
      },
      {
        fill: true,
        label: 'Checked In',
        data: [20, 25, 30, 35, 40, 50, 45, 45, 50, 55, 60, 65],
        borderColor: 'rgba(255, 159, 64, 0.7)',
        backgroundColor: 'rgba(255, 159, 64, 0.7)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h3 className="text-lg font-medium text-gray-800">EVENT ATTENDANCE ACTIVITY</h3>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-200 mr-2"></div>
            <span className="text-sm text-gray-600">Volunteers Signed Up</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
            <span className="text-sm text-gray-600">Checked In</span>
          </div>
        </div>
      </div>
      <Line options={options} data={data} height={80} />
    </div>
  );
};

export default EventAttendanceChart;
