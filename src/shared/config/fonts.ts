import { Nunito_Sans, Poppins } from "next/font/google";

export const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: '--font-nunito-sans',
  display: 'swap'
})

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: '--font-poppins',
  display: 'swap'
})
