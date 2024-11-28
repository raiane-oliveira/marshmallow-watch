import {
	api,
	Movie,
} from "@/shared/api";
import { Locale } from "@/shared/i18n";
import { useInfiniteQuery } from "@tanstack/react-query";

interface DiscoverMoviesProps {
  locale: Locale
  genreIds: string[]
}

export function useDiscoverMovies({locale = "en", genreIds}: DiscoverMoviesProps) {
	const query = useInfiniteQuery({
		queryKey: ["movies", ...genreIds],
		queryFn: async ({ pageParam }) => {
			const response = await api.get<{ movies: Movie[] }>(`/discover/movies?lang=${locale}&genreIds=${genreIds.join(",")}&page=${pageParam}`);

			return response.data.movies;
		},
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    },
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined
      }
      return firstPageParam - 1
    },
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
	});
	return query;
}

