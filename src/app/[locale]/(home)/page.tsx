import { HomePage } from "@/views/home-page";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getTranslations("HomePage.Metadata");

  return {
    title: dict("title"),
  };
}

export default HomePage;
