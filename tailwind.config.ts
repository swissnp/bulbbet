import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", ...fontFamily.sans],
      },
    },
  },
  daisyui: {
    themes: ["dracula"],
  },
  plugins: [require("daisyui")],
} satisfies Config;
