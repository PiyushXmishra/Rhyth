import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

interface LoadingSkeletonProps {
  count: number; // Number of loaders to display
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ count }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 pt-4">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} className="rounded-xl bg-accent p-2 flex flex-col items-center space-y-2 cursor-pointer">
          {/* Image skeleton */}
          <Skeleton className="w-48 h-44 rounded-xl " />
          
          {/* Title skeleton */}
          <Skeleton className="h-5 w-36 rounded-md bg-muted-foreground/30" />
        </Skeleton>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
