import React from 'react';

interface SkeletonProps {
  className?: string;
}


const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <>
      <div className={`relative overflow-hidden bg-[#0a0a0a] ${className}`}>
        <div
          className="
            absolute inset-0
            bg-gradient-to-r from-transparent via-gray-800 to-transparent
            animate-shimmer
          "
        />
      </div>
    </>
  );
}

export default Skeleton;