import {
	api,
	ApiErrorResponse,
	ApiResponse,
	CurrentUserApi,
	Either,
	left,
	right,
} from "@/shared/api";
import { getAuth } from "@/shared/model";
import { useQuery } from "@tanstack/react-query";

interface GetUserSuccessResponse {
	user: CurrentUserApi;
}

type LoginResponse = Either<
	ApiResponse<ApiErrorResponse>,
	ApiResponse<GetUserSuccessResponse>
>;

export function useGetUser(locale: string = "en") {
	const { accessTokenPayload, refreshToken } = getAuth();

	const query = useQuery<any, Error, LoginResponse>({
		queryKey: ["current-user", accessTokenPayload?.sub],
		queryFn: async (): Promise<LoginResponse> => {
			if (!refreshToken) {
				return left({
					status: 400,
					statusText: "Guest user",
					data: {
						message: "Guest ser",
					},
				});
			}

			const response = await api.get(`/users/current?locale=${locale}`);

			const sharedData = {
				status: response.status,
				statusText: response.statusText,
			};

			if (response.status !== 200) {
				return left({
					...sharedData,
					data: response.data,
				});
			}

			return right({
				...sharedData,
				data: response.data as GetUserSuccessResponse,
			});
		},
		refetchOnWindowFocus: false,
	});

	return query;
}
