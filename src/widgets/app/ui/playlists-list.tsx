import { Playlist } from "@/shared/api";
import { Link } from "@/shared/i18n";
import { userDefaultLists } from "@/shared/model";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/shared/ui";
import { MonitorPlay, Ticket } from "@phosphor-icons/react/dist/ssr";
import dayjs from "dayjs";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

interface MediasListProps {
	playlists: Playlist[];
}

export function PlaylistsList({ playlists }: MediasListProps) {
	const locale = useLocale();
	const dict = useTranslations("Shared.userLists");

	playlists.sort((a) => {
		if (Object.keys(userDefaultLists).includes(a.name)) {
			return 1;
		}

		return -1;
	});

	return (
		<Carousel
			opts={{
				dragFree: true,
				loop: true,
				align: "start",
			}}
		>
			<CarouselContent className="ml-0 w-full">
				{playlists?.map((playlist, index) => {
					const createdAt = dayjs(playlist.createdAt)
						.locale(locale)
						.format("ll");

					const withImage = false;

					const isDefaultPlaylist = Object.keys(userDefaultLists).includes(
						playlist.name,
					);

					const defaultPlaylistName = isDefaultPlaylist
						? dict(playlist.name as "willWatch" | "watched" | "watching")
						: "";

					if (isDefaultPlaylist) {
						return (
							<CarouselItem
								key={playlist.id}
								className="min-w-[230px] basis-[16dvw]"
							>
								<Link
									href={`/playlists/${playlist.id}`}
									style={{
										backgroundColor: playlist.color,
										color:
											userDefaultLists[
												playlist.name as keyof typeof userDefaultLists
											].darkColor,
									}}
									className="flex flex-col hover:brightness-75 transition-all duration-300 gap-2 justify-center items-center h-full w-full px-4-viewport py-3-viewport group overflow-hidden aspect-video flex-shrink-0 rounded-viewport relative"
								>
									<Ticket weight="fill" className="size-8-viewport" />
									<span
										title={defaultPlaylistName}
										className="font-bold text-lg-viewport/5-viewport block line-clamp-3"
									>
										{defaultPlaylistName} ({playlist.mediasId.length})
									</span>
								</Link>
							</CarouselItem>
						);
					}

					return (
						<CarouselItem
							key={playlist.id}
							className="min-w-[230px] basis-[16dvw]"
						>
							<Link
								href={`/playlists/${playlist.id}`}
								style={{
									backgroundColor: playlist.color,
									color: isDefaultPlaylist
										? userDefaultLists[
												playlist.name as keyof typeof userDefaultLists
											].darkColor
										: undefined,
								}}
								data-with-image={withImage}
								className="flex flex-col data-[with-image=false]:items-center data-[with-image=false]:justify-center text-zinc-100 bg-green-pastel-300 data-[with-image=false]:text-zinc-700 gap-2.5 h-full w-full px-4-viewport py-3-viewport group overflow-hidden aspect-video flex-shrink-0 rounded-viewport relative after:absolute after:inset-0 after:transition-all after:duration-200 after:w-full after:h-full focus-visible:after:visible focus-visible:after:opacity-100 hover:after:visible hover:after:opacity-100 after:opacity-0 after:invisible focus-visible:after:bg-black/25 hover:after:bg-black/25"
							>
								{withImage && (
									<Image
										src={""}
										alt=""
										width={410}
										height={230}
										quality={100}
										className="absolute will-change-transform inset-0 w-full h-full object-cover group-focus-visible:scale-105 group-hover:scale-105 transition-transform duration-200"
										loading={index < 5 ? "eager" : "lazy"}
									/>
								)}

								<div className="flex group-data-[with-image=false]:items-center flex-col z-10 group-data-[with-image=true]:invisible transition-all duration-200 group-data-[with-image=true]:opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 group-focus-visible:visible group-hover:visible group-data-[with-image=false]:gap-2 gap-0.5">
									{!withImage && (
										<MonitorPlay
											weight="fill"
											className="size-8-viewport flex-shrink-0"
										/>
									)}

									<span
										title={playlist.name}
										className="font-bold text-lg-viewport/5-viewport line-clamp-1 group-data-[with-image=true]:line-clamp-3"
									>
										{playlist.name}
									</span>
								</div>

								{withImage && (
									<div className="z-10 group-data-[with-image=true]:invisible group-data-[with-image=true]:opacity-0 mt-auto transition-all duration-200 group-focus-visible:opacity-100 group-focus-visible:visible group-hover:opacity-100 group-hover:visible flex items-center">
										<span className="font-poppins text-zinc-300/65 font-semibold text-xs-viewport/4-viewport">
											{createdAt}
										</span>
									</div>
								)}
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
