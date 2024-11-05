import { Skeleton } from "@/shared/ui";

export function MediasListSkeleton() {
	return (
		<div className="flex items-center w-full px-4 overflow-hidden gap-4">
			{Array.from({ length: 20 }).map((_, index) => (
				<Skeleton
					key={index}
					className="flex-shrink-0 min-w-[230px] aspect-video w-[16dvw] rounded"
				/>
			))}
		</div>
	);
}
