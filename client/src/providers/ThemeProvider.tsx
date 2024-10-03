import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setTheme, Theme } from "../redux/features/globalSlice";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
}: ThemeProviderProps) {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.global.theme);

  useEffect(() => {
    const savedTheme =
      (localStorage.getItem(storageKey) as Theme) || defaultTheme;
    dispatch(setTheme(savedTheme));
  }, [dispatch, defaultTheme, storageKey]);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  return <>{children}</>;
}
