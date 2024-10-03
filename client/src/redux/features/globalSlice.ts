import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Theme = "dark" | "light" | "system";

export interface InitialStateTypes {
    theme: Theme;
}

const initialState: InitialStateTypes = {
    theme: "system",
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<Theme>) => {
            state.theme = action.payload;
        },
    },
});

export const { setTheme } = globalSlice.actions;
export default globalSlice.reducer;