import { api, Media, Movie, TvShow } from "@/shared/api";
import { EllipsesBackground, Header, MediasListSkeleton } from "@/widgets/app";
import { MediasList } from "@/widgets/app/ui/medias-list";
import { getLocale, getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { HeroSection } from "./hero-section";
import dayjs from "dayjs";

export async function DiscoverPage() {
	const dict = await getTranslations("App.HomePage");
	const locale = await getLocale();

	const previousMonth = dayjs()
		.subtract(1, "month")
		.set("date", 1)
		.format("YYYY-MM-DD");

	const currentMonth = dayjs().set("date", 1).format("YYYY-MM-DD");

	return (
		<div>
			<Header />

			<main className="py-3 relative z-10 flex flex-col gap-3">
				<HeroSection />

				<div className="flex flex-col gap-6">
					<section className="flex flex-col w-full gap-2.5">
						<h4 className="font-bold block pl-8 text-xl-viewport/normal text-zinc-700">
							{dict("content.lists.popular")}
						</h4>

						<Suspense fallback={<MediasListSkeleton />}>
							<MediasList
								fetchMedia={async () => {
									const res = await api.get<
										any,
										{
											medias: Media[];
										}
									>(`/discover/movies-and-shows?lang=${locale}`);

									return res.data.medias;
								}}
							/>
						</Suspense>
					</section>

					<section className="flex flex-col w-full gap-2.5">
						<h4 className="font-bold block pl-8 text-xl-viewport/normal text-zinc-700">
							{dict("content.lists.releases")}
						</h4>

						<Suspense fallback={<MediasListSkeleton />}>
							<MediasList
								fetchMedia={async () => {
									const res = await api.get<
										any,
										{
											movies: Movie[];
										}
									>(
										`/discover/movies?lang=${locale}&release_date_gte=${previousMonth}&release_date_lte=${currentMonth}&sortBy=popularity.desc`,
									);

									return res.data.movies;
								}}
							/>
						</Suspense>
					</section>

					<section className="flex flex-col w-full gap-2.5">
						<h4 className="font-bold block pl-8 text-xl-viewport/normal text-zinc-700">
							{dict("content.lists.topRated")}
						</h4>

						<Suspense fallback={<MediasListSkeleton />}>
							<MediasList
								fetchMedia={async () => {
									const res = await api.get<
										any,
										{
											tvShows: TvShow[];
										}
									>(`/top-rated/tv-shows?lang=${locale}`);

									return res.data.tvShows;
								}}
							/>
						</Suspense>
					</section>
				</div>
			</main>

			<EllipsesBackground />
		</div>
	);
}
