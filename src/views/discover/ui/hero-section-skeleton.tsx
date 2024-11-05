import { Carousel, CarouselContent, CarouselItem, Skeleton } from "@/shared/ui";

export function HeroSectionSkeleton() {
	return (
		<section className="flex flex-col gap-5-viewport">
			<Carousel
				opts={{ loop: true, align: "center" }}
				className="[&_.-ml-4]:ml-4 [&_.-ml-4]:mr-12"
			>
				<CarouselContent>
					{Array.from({ length: 3 }).map((_, index) => (
						<CarouselItem
							key={index}
							className="pl-8 min-w-[1024px] max-w-[84vw] aspect-[3/1] w-full"
						>
							<Skeleton className="px-20-viewport rounded-xl overflow-hidden w-full h-full" />
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>

			<div className="flex mx-auto justify-center w-full items-center gap-2-viewport">
				{Array.from({ length: 10 }).map((_, index) => (
					<div
						key={index}
						className="bg-zinc-700/50 rounded-full size-3-viewport min-w-3 min-h-3"
					/>
				))}
			</div>
		</section>
	);
}
