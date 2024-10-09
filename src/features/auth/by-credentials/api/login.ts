import {
	api,
	ApiErrorResponse,
	ApiResponse,
	Either,
	left,
	right,
} from "@/shared/api";
import { LoginByCredentialsData } from "../ui/form-login";

interface LoginSuccessResponse {
	token: string;
}

type LoginResponse = Either<
	ApiResponse<ApiErrorResponse>,
	ApiResponse<LoginSuccessResponse>
>;

export async function login(
	data: LoginByCredentialsData,
	locale: string = "en",
): Promise<LoginResponse> {
	const response = await api.post<LoginByCredentialsData>(
		`/login?lang=${locale}`,
		{
			email: data.email,
			password: data.password,
		},
	);

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
		data: response.data as LoginSuccessResponse,
	});
}
