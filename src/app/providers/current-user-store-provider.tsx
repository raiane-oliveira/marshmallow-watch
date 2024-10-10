"use client";

import { CurrentUserStoreApi, CurrentUserStoreContext } from "@/entities/user";
import { createCurrentUserStore } from "@/entities/user/model/current-user-store";
import { ChildrenProps } from "@/shared/model";
import { useRef } from "react";

export function CurrentUserStoreProvider({ children }: ChildrenProps) {
	const storeRef = useRef<CurrentUserStoreApi>();
	if (!storeRef.current) {
		storeRef.current = createCurrentUserStore();
	}

	return (
		<CurrentUserStoreContext.Provider value={storeRef.current}>
			{children}
		</CurrentUserStoreContext.Provider>
	);
}
