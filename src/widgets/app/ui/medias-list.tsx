import { Media } from "@/shared/api";
import { Link } from "@/shared/i18n";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/shared/ui";
import dayjs from "dayjs";
import { getLocale } from "next-intl/server";
import Image from "next/image";

interface MediasListProps {
	fetchMedia: () => Promise<Media[]>;
}

export async function MediasList({ fetchMedia }: MediasListProps) {
	const locale = await getLocale();
	const medias = await fetchMedia();

	return (
		<Carousel
			opts={{
				dragFree: true,
				loop: true,
				align: "start",
			}}
		>
			<CarouselContent className="ml-0 w-full">
				{medias?.map((media, index) => {
					const mediaDate =
						"releaseAt" in media
							? (media.releaseAt as Date)
							: "firstAirDate" in media
								? (media.firstAirDate as Date)
								: null;

					const releaseAt = dayjs(mediaDate).locale(locale).format("ll");

					return (
						<CarouselItem
							key={media.id}
							className="min-w-[230px] basis-[16dvw]"
						>
							<Link
								href={`/movies/${media.id}`}
								className="flex flex-col text-zinc-100 gap-2.5 h-full w-full px-4-viewport py-3-viewport group overflow-hidden aspect-video flex-shrink-0 rounded-viewport bg-zinc-300 relative after:absolute after:inset-0 after:transition-all after:duration-200 after:w-full after:h-full focus-visible:after:visible focus-visible:after:opacity-100 hover:after:visible hover:after:opacity-100 after:opacity-0 after:invisible focus-visible:after:bg-black/25 hover:after:bg-black/25"
							>
								<Image
									src={media.imageUrl ?? ""}
									alt=""
									width={410}
									height={230}
									quality={100}
									className="absolute will-change-transform inset-0 w-full h-full object-cover group-focus-visible:scale-105 group-hover:scale-105 transition-transform duration-200"
									loading={index < 5 ? "eager" : "lazy"}
								/>

								<div className="flex flex-col z-10 invisible transition-all duration-200 opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 group-focus-visible:visible group-hover:visible gap-0.5">
									<span
										title={media.title}
										className="font-bold text-xl-viewport/normal block truncate"
									>
										{media.title}
									</span>

									{media.description && (
										<p className="font-medium text-sm-viewport/4-viewport w-full 2xl:line-clamp-3 line-clamp-2">
											{media.description}
										</p>
									)}
								</div>

								<div className="z-10 invisible opacity-0 mt-auto transition-all duration-200 group-focus-visible:opacity-100 group-focus-visible:visible group-hover:opacity-100 group-hover:visible">
									<time className="font-poppins text-zinc-300/65 font-semibold text-xs-viewport/4-viewport">
										{releaseAt}
									</time>
								</div>
							</Link>
						</CarouselItem>
					);
				})}
			</CarouselContent>

			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
