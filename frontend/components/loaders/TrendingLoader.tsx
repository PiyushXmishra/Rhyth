import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

interface LoadingSkeletonProps {
  count: number; // Number of loaders to display
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ count }) => {
  return (
    <div className="grid grid-cols-2 gap-4  pt-2  w-full">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} className="rounded-md bg-accent  flex flex-row  items-center  cursor-pointer">
          {/* Image skeleton */}
          <Skeleton className="relative w-80 h-14  overflow-hidden rounded-l-md  " />
          {/* Title skeleton */}
          <Skeleton className="pl-2   font-bold   text-sm  text-muted-foreground text-center" />
        </Skeleton>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
