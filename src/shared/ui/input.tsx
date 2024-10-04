import * as React from "react";

import { cn } from "@/shared/lib";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex data-[error=true]:ring-[1.5px] data-[error=true]:ring-red-500 data-[error=true]:text-red-500 duration-200 items-center transition-all w-full rounded-sm text-pink-500 bg-zinc-50 gap-2 px-5 py-3.5 file:border-0 file:bg-transparent file:text-sm font-medium file:font-medium file:text-zinc-700 placeholder:text-zinc-700/50 focus-visible:outline-none hover:ring-1 hover:ring-pink-500 focus-visible:ring-[1.5px] focus-visible:ring-pink-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:file:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
