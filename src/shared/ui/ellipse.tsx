import { ComponentProps } from "react";
import { cn } from "../lib";

export function Ellipse(props: ComponentProps<"div">) {
  return (
    <div
      aria-hidden
      {...props}
      className={cn("pointer-events-none", props.className)}
    />
  );
}
