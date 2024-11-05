"use client";

import "@/shared/config/dayjs";
import dayjs from "dayjs";

import { useFetchUpcomingMovies } from "@/entities/movies";
import {
	Carousel,
	CarouselContent,
	CarouselDots,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/shared/ui";
import { useLocale } from "next-intl";
import Image from "next/image";
import { HeroSectionSkeleton } from "./hero-section-skeleton";
import { Link } from "@/shared/i18n";
import AutoPlay from "embla-carousel-autoplay";

export function HeroSection() {
	const locale = useLocale();
	const { data, isLoading } = useFetchUpcomingMovies(locale);

	const movies = data?.isRight() ? data.value.data.movies : [];

	if (isLoading) {
		return <HeroSectionSkeleton />;
	}

	return (
		<Carousel
			opts={{ loop: true, align: "center" }}
			plugins={[
				AutoPlay({
					delay: 15 * 1000,
				}),
			]}
			className="[&_.-ml-4]:ml-4 [&_.-ml-4]:pb-10 [&_.-ml-4]:mr-12"
		>
			<CarouselContent>
				{movies.map((movie) => {
					const releaseAt = dayjs(movie.releaseAt).locale(locale).fromNow();

					return (
						<CarouselItem
							key={movie.id}
							className="pl-8 min-w-[1024px] max-w-[84vw] aspect-[3/1] w-full"
						>
							<Link
								href={`/movies/${movie.id}`}
								className="relative group px-20-viewport transition-all movie-banner-shadow-focus duration-300 drop-shadow-[0px_13px_15px_rgba(0,0,0,0.45)] flex items-center justify-start bg-zinc-300 rounded-xl overflow-hidden w-full h-full"
							>
								<div className="flex z-10 flex-col gap-6">
									<div className="text-zinc-100 flex flex-col gap-3.5">
										<h3
											title={movie.title}
											className="uppercase line-clamp-4 font-poppins font-bold text-5xl-viewport/none min-w-[350px] w-[24.3vw]"
										>
											{movie.title}
										</h3>
										<p className="font-bold line-clamp-5 text-lg-viewport/5-viewport w-[35.5vw] min-w-[512px]">
											{movie.description}
										</p>
									</div>

									<time className="text-sm-viewport text-zinc-300">
										{releaseAt
											.at(0)
											?.toUpperCase()
											.concat(releaseAt.substring(1))}
									</time>
								</div>

								<Image
									src={movie.imageUrl ?? ""}
									alt={movie.title}
									width={1440}
									height={1020}
									quality={100}
									className="absolute group-hover:scale-105 brightness-50 transition-transform duration-300 will-change-transform inset-0 w-full h-full object-cover"
									priority
								/>
							</Link>
						</CarouselItem>
					);
				})}
			</CarouselContent>

			<CarouselPrevious className="bottom-10" />
			<CarouselNext className="bottom-10" />

			<CarouselDots className="mx-auto justify-center absolute left-1/2 -translate-x-1/2 z-10 bottom-0 w-full" />
		</Carousel>
	);
}
