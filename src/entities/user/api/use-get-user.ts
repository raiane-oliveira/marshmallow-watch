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
import { useCurrentUserStore } from "..";

interface GetUserSuccessResponse {
	user: CurrentUserApi;
}

type LoginResponse = Either<
	ApiResponse<ApiErrorResponse>,
	ApiResponse<GetUserSuccessResponse>
>;

export function useGetUser(locale: string = "en") {
	const { accessTokenPayload } = getAuth();
	const setUser = useCurrentUserStore((state) => state.setUser);

	const query = useQuery<any, Error, LoginResponse>({
		queryKey: ["current-user", accessTokenPayload?.sub],
		queryFn: async () => {
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

			const { user } = response.data as GetUserSuccessResponse;
			setUser(user);

			return right({
				...sharedData,
				data: response.data,
			});
		},
		refetchOnWindowFocus: false,
	});
	return query;
}
