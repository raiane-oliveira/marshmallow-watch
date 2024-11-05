"use client";

import * as React from "react";
import useEmblaCarousel, {
	type UseEmblaCarouselType,
} from "embla-carousel-react";
import {
	ArrowLeft,
	ArrowRight,
	CaretLeft,
	CaretRight,
} from "@phosphor-icons/react";

import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui/button";
import { ClassValue } from "clsx";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
	opts?: CarouselOptions;
	plugins?: CarouselPlugin;
	orientation?: "horizontal" | "vertical";
	setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
	carouselRef: ReturnType<typeof useEmblaCarousel>[0];
	api: ReturnType<typeof useEmblaCarousel>[1];
	scrollPrev: () => void;
	scrollNext: () => void;
	canScrollPrev: boolean;
	canScrollNext: boolean;
	selectedIndex: number;
	scrollSnaps: number[];
	onDotClick: (index: number) => void;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
	const context = React.useContext(CarouselContext);

	if (!context) {
		throw new Error("useCarousel must be used within a <Carousel />");
	}

	return context;
}

const Carousel = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
	(
		{
			orientation = "horizontal",
			opts,
			setApi,
			plugins,
			className,
			children,
			...props
		},
		ref,
	) => {
		const [carouselRef, api] = useEmblaCarousel(
			{
				...opts,
				axis: orientation === "horizontal" ? "x" : "y",
			},
			plugins,
		);
		const [canScrollPrev, setCanScrollPrev] = React.useState(false);
		const [canScrollNext, setCanScrollNext] = React.useState(false);
		const [selectedIndex, setSelectedIndex] = React.useState(0);
		const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

		const onDotClick = React.useCallback(
			(index: number) => {
				if (!api) return;
				api.scrollTo(index);
			},
			[api],
		);

		const onSelect = React.useCallback((api: CarouselApi) => {
			if (!api) {
				return;
			}

			setCanScrollPrev(api.canScrollPrev());
			setCanScrollNext(api.canScrollNext());
			setSelectedIndex(api.selectedScrollSnap());
		}, []);

		const scrollPrev = React.useCallback(() => {
			api?.scrollPrev();
		}, [api]);

		const scrollNext = React.useCallback(() => {
			api?.scrollNext();
		}, [api]);

		const handleKeyDown = React.useCallback(
			(event: React.KeyboardEvent<HTMLDivElement>) => {
				if (event.key === "ArrowLeft") {
					event.preventDefault();
					scrollPrev();
				} else if (event.key === "ArrowRight") {
					event.preventDefault();
					scrollNext();
				}
			},
			[scrollPrev, scrollNext],
		);
		const onInit = React.useCallback((api: CarouselApi) => {
			if (!api) {
				return;
			}

			setScrollSnaps(api.scrollSnapList());
		}, []);

		React.useEffect(() => {
			if (!api || !setApi) {
				return;
			}

			setApi(api);
		}, [api, setApi]);

		React.useEffect(() => {
			if (!api) {
				return;
			}

			onInit(api);
			onSelect(api);
			api.on("reInit", onInit);
			api.on("reInit", onSelect);
			api.on("select", onSelect);

			return () => {
				api?.off("select", onSelect);
			};
		}, [api, onSelect, onInit]);

		return (
			<CarouselContext.Provider
				value={{
					carouselRef,
					api: api,
					opts,
					orientation:
						orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
					selectedIndex,
					scrollSnaps,
					onDotClick,
					scrollPrev,
					scrollNext,
					canScrollPrev,
					canScrollNext,
				}}
			>
				<div
					ref={ref}
					onKeyDownCapture={handleKeyDown}
					className={cn("relative", className)}
					role="region"
					aria-roledescription="carousel"
					{...props}
				>
					{children}
				</div>
			</CarouselContext.Provider>
		);
	},
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const { carouselRef, orientation } = useCarousel();

	return (
		<div ref={carouselRef} className="overflow-hidden">
			<div
				ref={ref}
				className={cn(
					"flex",
					orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
					className,
				)}
				{...props}
			/>
		</div>
	);
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const { orientation } = useCarousel();

	return (
		<div
			ref={ref}
			role="group"
			aria-roledescription="slide"
			className={cn(
				"min-w-0 shrink-0 grow-0 basis-full",
				orientation === "horizontal" ? "pl-4" : "pt-4",
				className,
			)}
			{...props}
		/>
	);
});
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<
	HTMLButtonElement,
	React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
	const { orientation, scrollPrev, canScrollPrev } = useCarousel();

	return (
		<button
			ref={ref}
			className={cn(
				"absolute flex items-center justify-center disabled:invisible z-10 opacity-0 hover:opacity-100 hover:visible focus-visible:opacity-100 focus-visible:visible transition-all duration-300 disabled:opacity-0 bg-gradient-to-l from-transparent to-black/70 rounded-none bg-transparent w-12-viewport text-zinc-100",
				orientation === "horizontal"
					? "left-0 top-0 bottom-0"
					: "top-0 left-1/2 -translate-x-1/2 rotate-90",
				className,
			)}
			disabled={!canScrollPrev}
			onClick={scrollPrev}
			{...props}
		>
			<CaretLeft className="size-5-viewport" weight="bold" />
			<span className="sr-only">Previous slide</span>
		</button>
	);
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
	HTMLButtonElement,
	React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
	const { orientation, scrollNext, canScrollNext } = useCarousel();

	return (
		<button
			ref={ref}
			type="button"
			className={cn(
				"absolute flex items-center justify-center z-10 opacity-0 hover:opacity-100 hover:visible focus-visible:opacity-100 focus-visible:visible transition-all duration-300 border-0 bg-gradient-to-r from-transparent to-black/70 rounded-none bg-transparent w-12-viewport text-zinc-100 disabled:invisible disabled:opacity-0",
				orientation === "horizontal"
					? "right-0 top-0 bottom-0"
					: "bottom-0 left-1/2 -translate-x-1/2 rotate-90",
				className,
			)}
			disabled={!canScrollNext}
			onClick={scrollNext}
			{...props}
		>
			<CaretRight className="size-5-viewport" weight="bold" />
			<span className="sr-only">Next slide</span>
		</button>
	);
});
CarouselNext.displayName = "CarouselNext";

const CarouselDots = React.forwardRef<
	HTMLDivElement,
	React.ComponentProps<"div"> & {
		buttonClassNames?: ClassValue;
	}
>(({ className, children, buttonClassNames, ...props }, ref) => {
	const { onDotClick, scrollSnaps, selectedIndex } = useCarousel();

	return (
		<div
			ref={ref}
			className={cn("flex items-center gap-2-viewport", className)}
			{...props}
		>
			{scrollSnaps.map((_, index) => {
				return (
					<button
						key={index}
						type="button"
						data-active={index === selectedIndex}
						className={cn(
							"size-3-viewport min-w-3 min-h-3 data-[active=true]:bg-zinc-700 bg-zinc-700/50 rounded-full",
							buttonClassNames,
						)}
						onClick={() => onDotClick(index)}
					/>
				);
			})}
		</div>
	);
});
CarouselDots.displayName = "CarouselDots";

export {
	type CarouselApi,
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
	CarouselDots,
};
