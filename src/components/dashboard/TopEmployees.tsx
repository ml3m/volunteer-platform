import React from 'react';

const topEmployees = [
  { name: 'Erica Romero', hours: '502h 45m', avatar: '/avatars/erica.jpg' },
  { name: 'Angela Sparks', hours: '296h 30m', avatar: '/avatars/angela.jpg' },
  { name: 'Nicolas Parks', hours: '239h 15m', avatar: '/avatars/nicolas.jpg' },
  { name: 'Melissa Webb', hours: '196h 22m', avatar: '/avatars/melissa.jpg' },
  { name: 'Jamal Adams', hours: '182h 13m', avatar: '/avatars/jamal.jpg' },
];

const TopEmployees: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center mb-4">
        <h3 className="text-lg font-medium text-gray-800">TOP EMPLOYEES</h3>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 ml-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </div>
      <ul className="space-y-4">
        {topEmployees.map((employee, index) => (
          <li key={index} className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
              <img 
                src={employee.avatar} 
                alt={employee.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${employee.name.replace(' ', '+')}&background=random`;
                }}
              />
            </div>
            <div>
              <div className="font-medium">{employee.name}</div>
              <div className="text-sm text-gray-500">{employee.hours}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopEmployees;
