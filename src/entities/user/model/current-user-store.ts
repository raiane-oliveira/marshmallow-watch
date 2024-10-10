import { CurrentUserApi } from "@/shared/api";
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
		return {
			user: null,
			setUser: (user) => set(() => ({ user })),
		};
	});
