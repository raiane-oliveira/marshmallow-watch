import { api, ApiErrorResponse, ApiValidationErrorResponse } from "@/shared/api";
import { RegisterByCredentialsData } from "../ui/form-register";

interface RegisterResponse {
  token: string
}
export type RegisterApiResponse = ApiErrorResponse | ApiValidationErrorResponse | RegisterResponse

export async function registerUser(data: RegisterByCredentialsData, locale: string = "en") {
  const response = await api.post<any, RegisterApiResponse>(`/users/register?lang=${locale}`, data);

  return {
    status: response.status,
    statusText: response.statusText,
    data: response.data
  };
}

