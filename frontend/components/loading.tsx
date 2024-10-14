// Skeleton.tsx
import React from 'react';

const Skeleton: React.FC<{ height: string; width: string }> = ({ height, width }) => {
  return (
    <div
      className={`bg-gray-300 animate-pulse ${width} ${height} rounded-xl`}
      style={{ height, width }}
    >
      {/* Optionally add something inside, like a loading animation */}
    </div>
  );
};

export default Skeleton;
