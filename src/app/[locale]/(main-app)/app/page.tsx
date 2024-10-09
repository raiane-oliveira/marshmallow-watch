import { DiscoverPage } from "@/views/discover";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getTranslations("App.HomePage.Metadata");

  return {
    title: dict("title"),
  };
}

export default DiscoverPage;
