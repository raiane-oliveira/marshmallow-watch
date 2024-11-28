import { Skeleton } from "@/shared/ui";

export function GenresListSkeleton() {
  return (
    <div className="flex items-center flex-wrap w-full px-8 overflow-hidden gap-4-viewport">
      {Array.from({ length: 15 }).map((_, index) => (
        <Skeleton
          key={index}
          className="flex-shrink-0 min-h-10 w-[7vw] rounded"
        />
      ))}
    </div>
  );
}

