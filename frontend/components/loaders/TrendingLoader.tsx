import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

interface LoadingSkeletonProps {
  count: number; // Number of loaders to display
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ count }) => {
  return (
    <div className="grid grid-cols-2 gap-4 lg:px-2 pt-2 lg:pt-4 w-full">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} className="rounded-md lg:rounded-xl bg-accent lg:p-2 flex flex-row lg:flex-col items-center lg:space-y-2 cursor-pointer">
          {/* Image skeleton */}
          <Skeleton className="relative w-80 h-14 lg:h-44 lg:w-full overflow-hidden rounded-l-md lg:rounded-xl " />
          
          {/* Title skeleton */}
          <Skeleton className="pl-2 lg:pl-0  font-bold   text-sm lg:text-base text-muted-foreground text-center" />
        </Skeleton>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
