import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setTheme, Theme } from "../redux/features/globalSlice";

export const useTheme = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.global.theme);

  const setThemeValue = (newTheme: Theme) => {
    dispatch(setTheme(newTheme));
  };

  return { theme, setTheme: setThemeValue };
};