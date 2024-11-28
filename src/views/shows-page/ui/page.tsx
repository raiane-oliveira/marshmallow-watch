'use client'

import { GenresListSkeleton, ToggleGroupGenresList, useGetShowGenres } from "@/entities/genres";
import { MediaCard } from "@/entities/medias";
import { useDiscoverShows } from "@/entities/shows";
import { useLocale, useTranslations } from "next-intl";
import { Fragment, useCallback, useState } from "react";
import { SkeletonsList } from "@/widgets/app";
import { useReachEndOfPage } from "@/shared/lib";

export function ShowsPage() {
  const [currentGenre, setCurrentGenre] = useState('featured')

  const locale = useLocale()
  const dict = useTranslations("App.TvShowsPage");
  const dictShared = useTranslations("Shared");

  const { status: statusGenres, data: dataGenres } = useGetShowGenres(locale)
  const genres = statusGenres !== "success" ? [] : dataGenres.genres

  const { status: statusShows, data: dataShows, fetchNextPage, isFetchingNextPage } = useDiscoverShows({
    locale,
    genreIds: currentGenre === "featured" ? [] : [currentGenre]
  })
  const showPages = statusShows !== 'success' ? [[]] : dataShows.pages

  const handleInfinitePagination = useCallback(async () => {
    if (isFetchingNextPage) return

    await fetchNextPage()
  }, [fetchNextPage, isFetchingNextPage])

  useReachEndOfPage({
    onPageEndNear: handleInfinitePagination
  })

  return (
    <main className="gap-8 relative flex flex-col py-6 w-full">
      <header className="w-full flex flex-col items-center justify-center">
        <h1 className="text-zinc-800 font-poppins text-center font-semibold text-4xl-viewport leading-10-viewport">{dict("content.header.title")}</h1>
      </header>


      {statusGenres === 'pending' ? <GenresListSkeleton /> : (
        <ToggleGroupGenresList value={currentGenre} onValueChange={setCurrentGenre} genres={genres} />
      )}

      <section className="gap-5-viewport grid px-8 grid-cols-[repeat(auto-fit,_minmax(259px,17.9vw))]">
        {statusShows === "pending" ? (
          <SkeletonsList />
        ) : showPages.map((shows, index) => {
          return (
            <Fragment key={index}>
              {shows.map((show) => {
                return (
                  <MediaCard key={show.id} media={show} locale={locale} />
                )
              })}
            </Fragment>
          )
        })}

        {isFetchingNextPage && (
          <SkeletonsList size={10} />
        )}

      </section>

      {isFetchingNextPage && (
        <div aria-label={dictShared("loading")} className="absolute pointer-events-none w-full bottom-0 h-[14vw] bg-gradient-to-t from-black/60 to:from-transparent" />
      )}
    </main >
  )
}
