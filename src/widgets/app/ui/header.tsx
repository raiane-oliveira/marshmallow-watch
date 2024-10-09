import { Link } from "@/shared/i18n";
import { Avatar, AvatarFallback, AvatarImage, Logo } from "@/shared/ui";
import {
  House,
  ListHeart,
  MagnifyingGlass,
  Popcorn,
  TelevisionSimple,
  User,
} from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";

export function Header() {
  const dict = useTranslations("App.header");

  return (
    <div className="w-full sticky">
      <header className="container font-poppins flex justify-between items-center">
        <nav className="flex items-center">
          <Link href="/app" className="block py-4 pr-8">
            <Logo className="w-14 h-9" />
          </Link>

          <Link
            href="/app"
            className="uppercase flex items-center gap-2 py-4 px-4.5 text-zinc-700"
          >
            <House className="size-5" />
            <span className="font-semibold text-sm/4">{dict("nav.home")}</span>
          </Link>

          <Link
            href="/search"
            className="text-zinc-700 flex items-center gap-2 py-4 px-4.5 uppercase"
          >
            <MagnifyingGlass className="size-5" />
            <span className="font-semibold text-sm/4">
              {dict("nav.search")}
            </span>
          </Link>

          <Link
            href="/movies"
            className="text-zinc-700 uppercase flex items-center gap-2 py-4 px-4.5"
          >
            <Popcorn className="size-5" />
            <span className="font-semibold text-sm/4">
              {dict("nav.movies")}
            </span>
          </Link>

          <Link
            href="/tv-shows"
            className="text-zinc-700 uppercase flex items-center gap-2 py-4 px-4.5"
          >
            <TelevisionSimple className="size-5" />
            <span className="font-semibold text-sm/4">
              {dict("nav.tvShows")}
            </span>
          </Link>

          <Link
            href="/favorites"
            className="text-zinc-700 uppercase flex items-center gap-2 py-4 px-4.5"
          >
            <ListHeart className="size-5" />
            <span className="font-semibold text-sm/4">
              {dict("nav.favorites")}
            </span>
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <span className="poppins text-md/4 font-semibold text-zinc-700">
            {dict("profile.name")}
          </span>
          <Avatar className="size-12">
            <AvatarImage src="" />
            <AvatarFallback>
              <User className="size-5" />
            </AvatarFallback>
          </Avatar>
        </div>
      </header>
    </div>
  );
}
