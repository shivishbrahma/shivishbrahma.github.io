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

/**
 * Convert a hex color to "R,G,B" string.
 * Accepts: "#abc", "abc", "#aabbcc", "aabbcc"
 * Returns: "r,g,b" (e.g. "255,0,127")
 * Throws TypeError for invalid input.
 */
function hexToRgbString (hex) {
    if (typeof hex !== "string") throw new TypeError("hex must be a string");
    const cleaned = hex.replace(/^#/, "").trim();
    if (![3, 6].includes(cleaned.length)) {
        throw new TypeError("Invalid hex color length");
    }
    const hexExpanded = cleaned.length === 3
        ? cleaned.split("").map(ch => ch + ch).join("")
        : cleaned;
    const r = parseInt(hexExpanded.slice(0, 2), 16);
    const g = parseInt(hexExpanded.slice(2, 4), 16);
    const b = parseInt(hexExpanded.slice(4, 6), 16);
    if ([r, g, b].some(n => Number.isNaN(n))) {
        throw new TypeError("Invalid hex color");
    }
    return `${r},${g},${b}`;
}

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
        document.documentElement.style.setProperty(`--${value}-rgb`, hexToRgbString(theme[value]));
    }
}

export const { toggleTheme, setBlogs, setProjects, setProgLang } = appSlice.actions;

export default appSlice.reducer;