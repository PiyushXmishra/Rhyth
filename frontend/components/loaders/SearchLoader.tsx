import React from 'react';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton component from Shadcn

const SkeletonLoading: React.FC<{ count: number }> = ({ count }) => {
  return (
    <div>
      <div className="overflow-y-auto pt-6">
        {[...Array(count)].map((_, index) => (
          <Skeleton key={index} className="flex items-center py-2 lg:my-2 bg-transparent">
            <Skeleton className="w-20 h-12 lg:w-28 lg:h-16 bg-muted-foreground/30" /> 
            <div className="ml-4 w-full space-y-2">
              <Skeleton className="h-4 w-full bg-muted-foreground/30" />
              <Skeleton className="h-4 w-44 bg-muted-foreground/30 " />
            </div>
          </Skeleton>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoading;
