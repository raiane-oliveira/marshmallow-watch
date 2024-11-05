"use client";

import { useCurrentUserStore, useGetUser } from "@/entities/user";
import { ChildrenProps } from "@/shared/model";
import { useLocale } from "next-intl";
import { useEffect } from "react";

export default function Layout({ children }: ChildrenProps) {
	const locale = useLocale();
	const { data } = useGetUser(locale);

	const setUser = useCurrentUserStore((state) => state.setUser);

	useEffect(() => {
		if (!data) return;

		if (data.isRight()) {
			setUser(data.value.data.user);
		}
	}, [data, setUser]);

	return <>{children}</>;
}
