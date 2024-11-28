"use client";

import { useCurrentUserStore } from "@/entities/user";
import { logout } from "@/features/auth/by-credentials";
import { Link, useRouter } from "@/shared/i18n";
import { toast } from "@/shared/lib";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Logo,
} from "@/shared/ui";
import { SignOut } from "@phosphor-icons/react";
import {
  House,
  ListHeart,
  MagnifyingGlass,
  Popcorn,
  TelevisionSimple,
  User,
} from "@phosphor-icons/react/dist/ssr";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

export function Header() {
  const dict = useTranslations("App.header");
  const user = useCurrentUserStore((state) => state.user);
  const setUser = useCurrentUserStore((state) => state.setUser);

  const { mutateAsync: logoutFn, status } = useMutation({
    mutationFn: logout,
  });

  const router = useRouter();

  async function handleLogout() {
    const res = await logoutFn();

    if (res.isLeft()) {
      return toast({
        title: "500",
        description: "Internal Server Error",
        variant: "destructive",
      });
    }

    setUser(null);
    router.push("/");
  }

  return (
    <div className="w-full px-8 z-50 sticky">
      <header className="font-poppins flex justify-between items-center">
        <nav className="flex items-center">
          <Link href="/app" className="block py-4 pr-8">
            <Logo className="w-14 h-9" />
          </Link>

          <Link
            href="/app"
            className="uppercase flex items-center gap-2 py-4 px-4.5 text-zinc-700"
          >
            <House weight="fill" className="size-5" />
            <span className="font-semibold text-sm/4">{dict("nav.home")}</span>
          </Link>

          <Link
            href="/search"
            className="text-zinc-700 flex items-center gap-2 py-4 px-4.5 uppercase"
          >
            <MagnifyingGlass weight="bold" className="size-5" />
            <span className="font-semibold text-sm/4">
              {dict("nav.search")}
            </span>
          </Link>

          <Link
            href="/movies"
            className="text-zinc-700 uppercase flex items-center gap-2 py-4 px-4.5"
          >
            <Popcorn weight="fill" className="size-5" />
            <span className="font-semibold text-sm/4">
              {dict("nav.movies")}
            </span>
          </Link>

          <Link
            href="/shows"
            className="text-zinc-700 uppercase flex items-center gap-2 py-4 px-4.5"
          >
            <TelevisionSimple weight="fill" className="size-5" />
            <span className="font-semibold text-sm/4">
              {dict("nav.tvShows")}
            </span>
          </Link>

          <Link
            href="/favorites"
            className="text-zinc-700 uppercase flex items-center gap-2 py-4 px-4.5"
          >
            <ListHeart weight="fill" className="size-5" />
            <span className="font-semibold text-sm/4">
              {dict("nav.favorites")}
            </span>
          </Link>
        </nav>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-4">
              <span className="poppins text-md/4 font-semibold text-zinc-700">
                {user?.name}
              </span>
              <Avatar className="size-12 drop-shadow">
                <AvatarImage src={user?.avatarUrl ?? ""} />
                <AvatarFallback>
                  <User className="size-6 text-zinc-700" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuLabel>
                {dict("profile.account.title")}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/me/${user.username}`}>
                  {dict("profile.account.profile")}
                </Link>
              </DropdownMenuItem>
              <button
                type="button"
                className="text-red-500 relative flex select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-zinc-100 focus:text-zinc-900 data-[disabled=true]:opacity-50 data-[disabled=true]:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus:bg-zinc-800 dark:focus:text-zinc-50 w-full hover:bg-red-100 hover:text-red-600 text-center"
                data-disabled={status === "pending"}
                disabled={status === "pending"}
                onClick={handleLogout}
              >
                <SignOut />
                {dict("profile.logout")}
              </button>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="poppins text-md/4 font-semibold text-zinc-700 underline hover:text-zinc-900"
            >
              {dict("profile.name")}
            </Link>

            <Avatar className="size-12 drop-shadow">
              <AvatarImage src={""} />
              <AvatarFallback>
                <User className="size-6 text-zinc-700" />
              </AvatarFallback>
            </Avatar>
          </div>
        )}
      </header>
    </div>
  );
}
