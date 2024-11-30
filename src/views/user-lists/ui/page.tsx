"use client";

import { PlaylistCard, useGetUserPlaylists } from "@/entities/playlists";
import { useCurrentUserStore } from "@/entities/user";
import { ApiRequestError, useReachEndOfPage } from "@/shared/lib";
import { getAuth } from "@/shared/model";
import { SkeletonsList } from "@/widgets/app";
import { useTranslations } from "next-intl";
import { Fragment, useCallback } from "react";

interface UserListsPageProps {
	locale: string;
	username: string;
}

export function UserListsPage({ locale, username }: UserListsPageProps) {
	const dict = useTranslations("App.MyListsPage");
	const dictShared = useTranslations("Shared");
	const accessToken = useCurrentUserStore((state) => state.accessToken);
	const { accessTokenPayload } = getAuth();

  const isCurrentUser = accessToken && username == accessTokenPayload?.username

	const {
		status: statusPlaylists,
		data: dataMovies,
		fetchNextPage,
		isFetchingNextPage,
    error,
	} = useGetUserPlaylists({
		username,
		accessToken,
    locale,
	});

	const playlistsPages =
		statusPlaylists !== "success"
			? [{ playlists: [], defaultPlaylists: [] }]
			: dataMovies.pages;

	const handleInfinitePagination = useCallback(async () => {
		if (isFetchingNextPage) return;

		await fetchNextPage();
	}, [fetchNextPage, isFetchingNextPage]);

	useReachEndOfPage({
		onPageEndNear: handleInfinitePagination,
	});

  // TODO: improve error UI
  if (error !== null && error instanceof ApiRequestError) {
    return <main className="py-6">
     <header className="w-full flex flex-col items-center justify-center">{error.message}</header> 
    </main> 
  }

	return (
		<main className="gap-8 relative flex flex-col py-6 w-full">
			<header className="w-full flex flex-col items-center justify-center">
				<h1 className="text-zinc-800 font-poppins text-center font-semibold text-4xl-viewport leading-10-viewport">
					{isCurrentUser
						? dict("content.header.title")
						: dict("content.header.anotherUser", { username })}
				</h1>
			</header>

			<div className="flex flex-col gap-16">
        {statusPlaylists === "pending" && (
          <section className="gap-5-viewport justify-center grid px-8 grid-cols-[repeat(auto-fit,_minmax(259px,17.9vw))]">
            <SkeletonsList size={3} />
          </section>
        )} 

        {statusPlaylists === "success" && playlistsPages[0].defaultPlaylists.length > 0 && (
          <section className="gap-5-viewport justify-center grid px-8 grid-cols-[repeat(auto-fit,_minmax(259px,17.9vw))]">
            {playlistsPages.map((data, index) => {
              const playlists = data.defaultPlaylists;
              return (
                <Fragment key={index}>
                  {playlists.map((playlist) => {
                    const defaultPlaylistName = playlist.isDefault
                      ? dictShared(
                          `userLists.${playlist.name as "willWatch" | "watched" | "watching"}`,
                        )
                      : "";

                    return (
                      <PlaylistCard
                        key={playlist.id}
                        defaultPlaylistName={defaultPlaylistName}
                        playlist={playlist}
                        locale={locale}
                      />
                    );
                  })}
                </Fragment>
              );
            })}
          </section>
        )}

				<section className="gap-5-viewport grid px-8 grid-cols-[repeat(auto-fit,_minmax(259px,17.9vw))]">
					{statusPlaylists === "pending" && (
						<SkeletonsList />
					)}  

          {statusPlaylists === "success" && playlistsPages[0].playlists.length <= 0 && (
            <p className="col-span-full text-center text-zinc-800 text-2xl mx-auto max-w-md font-medium">{isCurrentUser ? dict.rich("content.emptyLists.currentUser", {
              button: (chunks) => <button className="underline font-semibold" type="button">{chunks}</button>
            }) : dict("content.emptyLists.anotherUser", {
                username
              })}</p>
          )}

          {statusPlaylists === "success" &&
            playlistsPages.map((data, index) => {
							const playlists = data.playlists;
							return (
								<Fragment key={index}>
									{playlists.map((playlist) => {
										return (
											<PlaylistCard
												key={playlist.id}
												playlist={playlist}
												locale={locale}
											/>
										);
									})}
								</Fragment>
							);
						})
					}

					{isFetchingNextPage && <SkeletonsList size={5} />}
				</section>
			</div>

			{isFetchingNextPage && (
				<div
					aria-label={dictShared("loading")}
					className="absolute pointer-events-none w-full bottom-0 h-[14vw] bg-gradient-to-t from-black/60 to:from-transparent"
				/>
			)}
		</main>
	);
}
