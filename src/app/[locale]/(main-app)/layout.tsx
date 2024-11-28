"use client";

import { useCurrentUserStore, useGetUser } from "@/entities/user";
import { ChildrenProps, getAuth, userSessionDataKeyName } from "@/shared/model";
import { EllipsesBackground, Header } from "@/widgets/app";
import { useLocale } from "next-intl";
import { useEffect } from "react";

export default function Layout({ children }: ChildrenProps) {
  const locale = useLocale();
  const setUser = useCurrentUserStore((state) => state.setUser);
  const setAccessToken = useCurrentUserStore((state) => state.setAccessToken);
  const { data } = useGetUser(locale);

  const { accessToken } = getAuth();

  useEffect(() => {
    if (accessToken) {
      setAccessToken(accessToken);
    }
  }, [setAccessToken, accessToken]);

  useEffect(() => {
    if (!data) return;

    if (data.isRight()) {
      setUser(data.value.data.user);
      localStorage.setItem(
        userSessionDataKeyName,
        JSON.stringify(data.value.data.user),
      );
    }
  }, [data, setUser]);

  return (
    <div>
      <Header />

      {children}

      <EllipsesBackground />
    </div>
  )
}
