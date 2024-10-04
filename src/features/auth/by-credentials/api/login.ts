import { api, ApiErrorResponse, ApiValidationErrorResponse } from "@/shared/api";
import { LoginByCredentialsData } from "../ui/form-login";

interface LoginResponse {
  token: string
}
export type LoginApiResponse = LoginResponse | ApiErrorResponse | ApiValidationErrorResponse

export async function login(data: LoginByCredentialsData, locale: string = "en") {
  const response = await api.post<LoginByCredentialsData, LoginApiResponse>(`/login?lang=${locale}`, {
    email: data.email,
    password: data.password,
  });

  return {
    status: response.status,
    statusText: response.statusText,
    data: response.data
  };
}
