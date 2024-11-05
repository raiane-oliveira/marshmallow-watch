import { CurrentUserApi } from "@/shared/api";
import { userSessionDataKeyName } from "@/shared/model";
import { createStore } from "zustand";

interface CurrentUserState {
	user: CurrentUserApi | null;
}

interface CurrentUserActions {
	setUser: (user: CurrentUserApi | null) => void;
}

export type CurrentUserStore = CurrentUserState & CurrentUserActions;

export const createCurrentUserStore = () =>
	createStore<CurrentUserStore>()((set) => {
		const userData = localStorage.getItem(userSessionDataKeyName);

		return {
			user: userData ? JSON.parse(userData) : null,
			setUser: (user) => set(() => ({ user })),
		};
	});
