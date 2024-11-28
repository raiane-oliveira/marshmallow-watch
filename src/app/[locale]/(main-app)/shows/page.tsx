import { ShowsPage } from "@/views/shows-page";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getTranslations("App.TvShowsPage.Metadata")

  return {
    title: dict("title")
  }
}

export default ShowsPage
