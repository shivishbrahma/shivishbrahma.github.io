import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        theme: window.localStorage.getItem("shivishbrahma-portfolio-theme") || "dark"
    },
    reducers: {
        toggleTheme: (state) => {
            const newTheme = state.theme === "light" ? "dark" : "light";
            state.theme = newTheme;
            window.localStorage.setItem("shivishbrahma-portfolio-theme", newTheme);
        }
    }
});

export const themes = {
    light: {
        base: "#302b27",
        primary: "#00374d",
        secondary: "#a50d12",
        tertiary: "#02642c",
        quaternary: "#fec601",
        baseBg: "#ffffff",
        primaryBg: "#e6f8ff"
    },
    dark: {
        base: "#f4f2f1",
        primary: "#00a8e8",
        secondary: "#f15156",
        tertiary: "#04f06a",
        quaternary: "#ffe066",
        baseBg: "#00171f",
        primaryBg: "#00394d"
    }
};

export function setCSSVariables (theme) {
    for (const value in theme) {
        document.documentElement.style.setProperty(`--${value}`, theme[value]);
    }
}

export const { toggleTheme } = appSlice.actions;

export default appSlice.reducer;