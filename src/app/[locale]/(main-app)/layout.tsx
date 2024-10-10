"use client";

import { useGetUser } from "@/entities/user";
import { ChildrenProps } from "@/shared/model";
import { useLocale } from "next-intl";

export default function Layout({ children }: ChildrenProps) {
	const locale = useLocale();
	useGetUser(locale);

	return <>{children}</>;
}
