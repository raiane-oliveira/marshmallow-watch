import { createContext, useContext } from "react";
import { createCurrentUserStore, CurrentUserStore } from "./current-user-store";
import { useStore } from "zustand";

export type CurrentUserStoreApi = ReturnType<typeof createCurrentUserStore>;

export const CurrentUserStoreContext = createContext<
	CurrentUserStoreApi | undefined
>(undefined);

export const useCurrentUserStore = <T>(
	selector: (store: CurrentUserStore) => T,
) => {
	const context = useContext(CurrentUserStoreContext);

	if (!context) {
		throw new Error(
			"useCurrentUserStore must be used within CurrentUserStoreProvider",
		);
	}

	return useStore(context, selector);
};
