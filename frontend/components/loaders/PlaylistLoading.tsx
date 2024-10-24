import { X } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton component from Shadcn

const SkeletonLoading: React.FC<{ count: number }> = ({ count }) => {
  return (
    <div className='overflow-y-auto'>
      <div className="flex flex-row justify-between text-xl text-muted-foreground font-semibold mb-2 px-2">
        <Skeleton className="h-7 w-2/4 bg-muted-foreground/30" /> {/* Shadcn skeleton for title */}
        <div className="flex items-center">
          <Link href="/">
            <X className="cursor-pointer" />
          </Link>
        </div>
      </div>
      <div className="overflow-y-auto ">
        {/* Generate skeleton loaders */}
        {[...Array(count)].map((_, index) => (
          <Skeleton key={index} className="flex items-center p-2 bg-accent rounded-xl m-2">
            <Skeleton className="w-20 h-12 md:w-28 md:h-16 bg-muted-foreground/30" /> {/* Shadcn skeleton for thumbnail */}
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
