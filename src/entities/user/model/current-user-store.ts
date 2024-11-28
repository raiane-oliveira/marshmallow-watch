import { CurrentUserApi } from "@/shared/api";
import { getAuth, userSessionDataKeyName } from "@/shared/model";
import { createStore } from "zustand";

interface CurrentUserState {
	user: CurrentUserApi | null;
	accessToken: string | null;
	refreshToken: string | null;
}

interface CurrentUserActions {
	setUser: (user: CurrentUserApi | null) => void;
	setAccessToken: (token: string | null) => void;
	setRefreshToken: (token: string | null) => void;
}

export type CurrentUserStore = CurrentUserState & CurrentUserActions;

export const createCurrentUserStore = () =>
	createStore<CurrentUserStore>()((set) => {
		const userData = localStorage.getItem(userSessionDataKeyName)
		const { accessToken, refreshToken } = getAuth();

		return {
			user: userData ? JSON.parse(userData) : null,
			accessToken: accessToken ?? null,
			refreshToken: refreshToken ?? null,
			setUser: (user) => set(() => ({ user })),
			setAccessToken: (accessToken) => set(() => ({ accessToken })),
			setRefreshToken: (refreshToken) => set(() => ({ refreshToken })),
		};
	});
