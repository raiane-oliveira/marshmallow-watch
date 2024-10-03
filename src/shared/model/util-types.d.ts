import { ReactNode } from "react"
import { Locale } from "../i18n"

export interface ChildrenProps {
  children: ReactNode
}

export interface PageLocaleParams {
  params: {
    locale: Locale
  }
}
