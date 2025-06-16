import { use } from "react";
import { ThemeProviderContext } from "../context/theme-provider";

export default function useTheme() {
  const context = use(ThemeProviderContext);

  if (!context) {
    throw Error("useTheme must be used within a ThemeProviderContext");
  }

  return context;
}
