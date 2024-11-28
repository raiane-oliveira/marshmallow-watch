import { MoviesPage } from "@/views/movies-page";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getTranslations("App.MoviesPage.Metadata")

  return {
    title: dict("title")
  }
}

export default MoviesPage
