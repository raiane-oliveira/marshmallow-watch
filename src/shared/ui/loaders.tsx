import { ComponentPropsWithoutRef } from "react";
import { cn } from "../lib";

export function DuoToneSpinner({
  className,
  ...props
}: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      {...props}
      className={cn("duo-tone-spinner-loader", className)}
    ></span>
  );
}
