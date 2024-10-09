import {
	api,
	ApiErrorResponse,
	ApiResponse,
	Either,
	left,
	right,
} from "@/shared/api";
import { RegisterByCredentialsData } from "../ui/form-register";

interface ApiRegisterResponse {
	token: string;
}

type RegisterResponse = Either<
	ApiResponse<ApiErrorResponse>,
	ApiResponse<ApiRegisterResponse>
>;

export async function registerUser(
	data: RegisterByCredentialsData,
	locale: string = "en",
): Promise<RegisterResponse> {
	const response = await api.post<RegisterByCredentialsData>(
		`/users/register?lang=${locale}`,
		data,
	);

	if (response.status !== 201) {
		return left({
			status: response.status,
			statusText: response.statusText,
			data: response.data,
		});
	}

	return right({
		status: response.status,
		statusText: response.statusText,
		data: response.data,
	});
}
