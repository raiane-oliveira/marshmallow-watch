import { api, ApiErrorResponse, ApiValidationErrorResponse } from "@/shared/api";
import { LoginByCredentialsData } from "../ui/form-login";

export type LoginApiResponse = {
  token: string;
} | ApiErrorResponse | ApiValidationErrorResponse


export async function login(data: LoginByCredentialsData) {
  const response = await api.post<LoginByCredentialsData, LoginApiResponse>("/login", {
    email: data.email,
    password: data.password,
  });

  return {
    status: response.status,
    statusText: response.statusText,
    data: response.data
  };
}
