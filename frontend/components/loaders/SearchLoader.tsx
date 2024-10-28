import React from 'react';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton component from Shadcn

const SkeletonLoading: React.FC<{ count: number }> = ({ count }) => {
  return (
    <div>
      <div className="overflow-y-auto ">
        {/* Generate skeleton loaders */}
        {[...Array(count)].map((_, index) => (
          <Skeleton key={index} className="flex items-center p-2 lg:bg-accent rounded-xl lg:m-2 bg-transparent">
            <Skeleton className="w-20 h-12 lg:w-28 lg:h-16 bg-muted-foreground/30" /> {/* Shadcn skeleton for thumbnail */}
            <div className="ml-4 w-full space-y-2">
              <Skeleton className="h-4 w-full bg-muted-foreground/30" />
               {/* Shadcn skeleton for title */}
               <Skeleton className="h-4 w-44 bg-muted-foreground/30 " />
            </div>
          </Skeleton>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoading;
