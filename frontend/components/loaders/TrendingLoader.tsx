import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

interface LoadingSkeletonProps {
  count: number; // Number of loaders to display
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ count }) => {
  return (
    <div className="grid grid-cols-2 gap-4 md:px-2 md:pt-4 w-full">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} className="rounded-md md:rounded-xl bg-accent md:p-2 flex flex-row md:flex-col items-center md:space-y-2 cursor-pointers w-full">
          {/* Image skeleton */}
          <Skeleton className="relative w-80 h-12 md:h-44 md:w-full overflow-hidden rounded-l-md md:rounded-xl " />
          
          {/* Title skeleton */}
          <Skeleton className="pl-2 md:pl-0 font-semibold text-sm md:text-base text-muted-foreground text-center" />
        </Skeleton>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
