import { api } from "@/shared/api";

export async function refreshToken() {
  const response = await api.patch<any, { token: string }>('/token/refresh')
  return response
}
