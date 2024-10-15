import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Theme = "dark" | "light" | "system";

export interface InitialStateTypes {
    theme: Theme;
    isMenuOpen: boolean;
}

const initialState: InitialStateTypes = {
    theme: "system",
    isMenuOpen: false,
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<Theme>) => {
            state.theme = action.payload;
        },
        toggleMenu: (state) => {
            state.isMenuOpen = !state.isMenuOpen;
        },
    },
});

export const { setTheme, toggleMenu } = globalSlice.actions;
export default globalSlice.reducer;