"use client";

import { Button, DuoToneSpinner, Input } from "@/shared/ui";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { login } from "../api/login";
import { toast } from "@/shared/lib";
import { useRouter } from "@/shared/i18n";
import { setCookie } from "cookies-next";
import { accessTokenCookieName } from "@/shared/model";

export const loginByCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginByCredentialsData = z.infer<typeof loginByCredentialsSchema>;

export function FormLogin() {
  const locale = useLocale();
  const dict = useTranslations("LoginPage.form");
  const dictApi = useTranslations("Api.login");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginByCredentialsData>({
    resolver: zodResolver(loginByCredentialsSchema),
  });

  const router = useRouter();

  async function handleLoginUser(data: LoginByCredentialsData) {
    try {
      const response = await login(data, locale);

      if (response.status !== 200) {
        return toast({
          title: dictApi("title"),
          description: response.data.message,
          variant: "destructive",
        });
      }

      setCookie(accessTokenCookieName, response.data.token);

      router.push("/app");
    } catch (err) {
      return toast({
        title: "500",
        description: "Internal Server Error",
        variant: "destructive",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleLoginUser)}
      className="flex flex-col gap-4.5"
    >
      <div className="flex flex-col gap-3">
        <label className="flex flex-col gap-2">
          <Input
            aria-label={dict("inputs.email.placeholder")}
            placeholder={dict("inputs.email.placeholder")}
            data-error={errors.email !== undefined}
            {...register("email")}
          />

          {errors.email && (
            <span className="text-red-500 text-sm">
              {dict("inputs.email.errorMessage")}
            </span>
          )}
        </label>

        <label className="flex flex-col gap-2">
          <Input
            type="password"
            placeholder={dict("inputs.password.placeholder")}
            aria-label={dict("inputs.password.placeholder")}
            data-error={errors.password !== undefined}
            {...register("password")}
          />

          {errors.password && (
            <span className="text-red-500 text-sm">
              {dict("inputs.password.errorMessage")}
            </span>
          )}
        </label>
      </div>

      <Button
        size="lg"
        type="submit"
        className="w-full font-poppins font-semibold text-base/6 text-zinc-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? <DuoToneSpinner /> : dict("submitButton")}
      </Button>
    </form>
  );
}
