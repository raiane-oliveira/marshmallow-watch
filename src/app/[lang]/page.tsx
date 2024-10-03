import { getDictionary } from "@/shared/i18n/get-dictionary";
import { PageLocaleParams } from "@/shared/model";

export default async function Home({ params: { lang } }: PageLocaleParams) {
  const dict = await getDictionary(lang);

  return <h1 className="p-4 text-4xl font-bold">{dict.home.title}</h1>;
}
