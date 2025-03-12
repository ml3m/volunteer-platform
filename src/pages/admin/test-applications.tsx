import React from 'react';
import ApplicationsContent from '../../components/dashboard/ApplicationsContent';

const TestApplicationsPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Applications Component</h1>
      <ApplicationsContent />
    </div>
  );
};

export default TestApplicationsPage;
