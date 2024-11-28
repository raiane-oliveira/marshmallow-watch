import { Skeleton } from "@/shared/ui";
import { ClassNameValue, twMerge } from "tailwind-merge";

interface SkeletonsListProps {
  size?: number
  className?: ClassNameValue
}

export function SkeletonsList({ size = 40, className }: SkeletonsListProps) {
  return Array.from({ length: size }).map((_, index) => (
    <Skeleton
      key={index}
      className={twMerge("flex-shrink-0 min-w-[259px] aspect-video w-[17.9dvw] rounded", className)}
    />
  ))
    ;
}

