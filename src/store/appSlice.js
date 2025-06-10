import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        theme: window.localStorage.getItem("shivishbrahma-portfolio-theme") || "dark",
        blogs: [],
        projects: [],
        progLang: window.localStorage.getItem("shivishbrahma-portfolio-theme") || "JavaScript"
    },
    reducers: {
        toggleTheme: (state) => {
            const newTheme = state.theme === "light" ? "dark" : "light";
            state.theme = newTheme;
            window.localStorage.setItem("shivishbrahma-portfolio-theme", newTheme);
        },
        setBlogs: (state, action) => {
            state.blogs = action.payload;
        },
        setProjects: (state, action) => {
            state.projects = action.payload;
        },
        setProgLang: (state, action) => {
            state.progLang = action.payload;
        }
    }
});

export const themes = {
    "light": {
        "base": "#00171f",
        "primary": "#0086b3",
        "secondary": "#c6393f",
        "tertiary": "#03b55a",
        "quaternary": "#d6b600",
        "baseBg": "#f4f2f1",
        "primaryBg": "#e0f7fa"
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

export const { toggleTheme, setBlogs, setProjects, setProgLang } = appSlice.actions;

export default appSlice.reducer;