import React from 'react';

interface DebugInfoProps {
  activeContent: string;
}

const DebugInfo: React.FC<DebugInfoProps> = ({ activeContent }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-70 text-white p-2 rounded-md z-50 text-xs">
      <div>Active Content: {activeContent}</div>
    </div>
  );
};

export default DebugInfo; 