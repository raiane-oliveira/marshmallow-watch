import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("home");

  return <h1 className="p-4 text-4xl font-bold">{t("title")}</h1>;
}
