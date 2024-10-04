import { LoginPage } from "@/views/auth/login";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getTranslations("LoginPage.Metadata");

  return {
    title: dict("title"),
  };
}

export default LoginPage;
