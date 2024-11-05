import {
	api,
	ApiErrorResponse,
	ApiResponse,
	Either,
	left,
	right,
} from "@/shared/api";
import { accessTokenCookieName, userSessionDataKeyName } from "@/shared/model";
import { deleteCookie } from "cookies-next";

type LogoutResponse = Either<ApiResponse<ApiErrorResponse>, ApiResponse<null>>;

export async function logout(): Promise<LogoutResponse> {
	const response = await api.delete(`/logout`);

	const sharedData = {
		status: response.status,
		statusText: response.statusText,
	};

	if (response.status !== 204) {
		return left({
			...sharedData,
			data: {
				message: "Internal Server Error",
			},
		});
	}

	deleteCookie(accessTokenCookieName);
	localStorage.removeItem(userSessionDataKeyName);

	return right({
		...sharedData,
		data: null,
	});
}
