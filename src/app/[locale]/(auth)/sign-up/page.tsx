import { SignUpWithCredentialsPage } from "@/views/auth/sign-up";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getTranslations("RegisterPage.Metadata");

  return {
    title: dict("title"),
  };
}

export default SignUpWithCredentialsPage;
