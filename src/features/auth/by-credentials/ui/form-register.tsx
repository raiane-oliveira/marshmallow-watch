"use client";

import { Button, DuoToneSpinner, Input } from "@/shared/ui";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerUser } from "../api/register";
import { toast } from "@/shared/lib";
import { useRouter } from "@/shared/i18n";
import { setCookie } from "cookies-next";
import { accessTokenCookieName } from "@/shared/model";

export const registerByCredentialsSchema = z.object({
  name: z.string(),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export type RegisterByCredentialsData = z.infer<
  typeof registerByCredentialsSchema
>;

export function FormRegister() {
  const locale = useLocale();
  const dict = useTranslations("RegisterPage.form");
  const dictApi = useTranslations("Api.register");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterByCredentialsData>({
    resolver: zodResolver(registerByCredentialsSchema),
  });

  const router = useRouter();

  async function handleRegisterUser(data: RegisterByCredentialsData) {
    try {
      const response = await registerUser(data, locale);

      if (response.status !== 201) {
        return toast({
          title: dictApi("title"),
          description: response.data.message,
          variant: "destructive",
        });
      }

      setCookie(accessTokenCookieName, response.data.token);

      router.push("/app");
    } catch (err: any) {
      return toast({
        title: "500",
        description: err?.message ?? "Internal Server Error",
        variant: "destructive",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleRegisterUser)}
      className="flex flex-col gap-4.5"
    >
      <div className="flex flex-col gap-3">
        <label className="flex flex-col gap-2">
          <Input
            aria-label={dict("inputs.name.placeholder")}
            placeholder={dict("inputs.name.placeholder")}
            data-error={errors.name !== undefined}
            {...register("name")}
          />

          {errors.name && (
            <span className="text-red-500 text-sm">
              {dict("inputs.name.errorMessage")}
            </span>
          )}
        </label>

        <label className="flex flex-col gap-2">
          <Input
            aria-label={dict("inputs.username.placeholder")}
            placeholder={dict("inputs.username.placeholder")}
            data-error={errors.username !== undefined}
            {...register("username")}
          />

          {errors.username && (
            <span className="text-red-500 text-sm">
              {dict("inputs.username.errorMessage")}
            </span>
          )}
        </label>

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
