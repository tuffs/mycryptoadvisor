import React from 'react';

interface SkeletonProps {
  className?: string;
}


const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <>
      <div className={`relative overflow-hidden bg-gray-800 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer" />
      </div>
    </>
  );
}

export default Skeleton;