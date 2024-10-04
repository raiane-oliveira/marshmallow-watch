import { Ellipse, Logo } from "@/shared/ui";
import { useTranslations } from "next-intl";
import { Link } from "@/shared/i18n";
import { FormRegister } from "@/features/auth/by-credentials";

export function SignUpWithCredentialsPage() {
  const dict = useTranslations("RegisterPage");

  return (
    <main className="flex h-screen w-full">
      <section className="hidden overflow-hidden bg-pink-300 relative justify-center items-center h-full w-full max-w-[47%] md:flex">
        <div className="flex flex-col items-center z-50 relative gap-1">
          <Logo />
          <span className="font-extrabold text-center max-w-48 text-3xl/9 text-zinc-50 drop-shadow-[0px_4px_4px_rgba(255,255,255,0.25)]">
            Marshmallow Watch
          </span>
        </div>

        <Ellipse className="absolute rounded-full bg-green-pastel-300/55 blur-4xl -left-1/3 -bottom-1/3 size-10/12" />
        <Ellipse className="absolute rounded-full bg-blue-pastel-300/40 blur-4xl -right-[20%] bottom-[10%] h-1/2 w-10/12" />
        <Ellipse className="absolute rounded-full bg-yellow-pastel-300/40 blur-4xl -right-[20%] -top-[40%] h-3/4 rotate-[124deg] w-full" />
      </section>

      <section className="max-w-96 flex flex-col self-center gap-10 w-full mx-auto">
        <div className="w-full">
          <h1 className="font-bold text-2xl">{dict("header.title")}</h1>
          <p className="font-medium">
            {dict.rich("header.description", {
              link: (text) => (
                <Link className="underline" href="/login">
                  {text}
                </Link>
              ),
            })}
          </p>
        </div>

        <FormRegister />
      </section>
    </main>
  );
}
