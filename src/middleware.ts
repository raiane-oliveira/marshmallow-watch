import { routing } from "@/shared/i18n";
import createMiddleware from "next-intl/middleware";

export default createMiddleware(routing)

export const config = {
  matcher: [
    '/', `/(en|pt-BR)/:path*`
  ]
}
