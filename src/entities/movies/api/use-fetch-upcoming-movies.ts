import {
	api,
	ApiErrorResponse,
	ApiResponse,
	Either,
	left,
	Movie,
	right,
} from "@/shared/api";
import { useQuery } from "@tanstack/react-query";

interface FetchUpcomingMoviesSuccessResponse {
	movies: Movie[];
}

type FetchUpcomingMoviesResponse = Either<
	ApiResponse<ApiErrorResponse>,
	ApiResponse<FetchUpcomingMoviesSuccessResponse>
>;

export function useFetchUpcomingMovies(locale: string = "en") {
	const query = useQuery<any, Error, FetchUpcomingMoviesResponse>({
		queryKey: ["upcoming-movies"],
		queryFn: async () => {
			const response = await api.get(`/upcoming/movies?lang=${locale}`);

			const sharedData = {
				status: response.status,
				statusText: response.statusText,
			};

			if (response.status !== 200) {
				return left({
					...sharedData,
					data: response.data as ApiErrorResponse,
				});
			}

			return right({
				...sharedData,
				data: response.data as FetchUpcomingMoviesSuccessResponse,
			});
		},
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
	});
	return query;
}
