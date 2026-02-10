import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name: "app",
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
    light: {
        // "Vintage Comic / Pop Art" Aesthetic
        base: "#040720",      // Deep Navy "Ink" for high-contrast text [1]
        primary: "#2c75ff",   // Electric Blue [2]
        secondary: "#ff00bd", // Spider-Verse Magenta [2]
        tertiary: "#fb5607",  // Horizon Orange [1]
        quaternary: "#ffbe0b",// High-Vis Yellow [3]
        baseBg: "#eaeaea",    // "Clean Studio" Grey-White (better for readability) [1]
        primaryBg: "#ffffff"  // Pure White panels to pop against the grey base [4]
    },
    dark: {
        // "Cyberpunk Skyline / Neon Noir" Aesthetic
        base: "#d1f7ff",      // Light Cyan text for "glowing" readability 
        primary: "#ff2079",   // Hot Magenta accents [1]
        secondary: "#0affef", // Cyan Data Stream [1]
        tertiary: "#ffe900",  // Neon Yellow [1]
        quaternary: "#39FF14",// Poison Green [4]
        baseBg: "#050308",    // "Midnight Noir" (Deepest possible black) [1]
        primaryBg: "#41454c"  // "Deeper Navy" for panels (provides clear separation) [1]
    }
};

export function setCSSVariables (theme) {
    for (const value in theme) {
        document.documentElement.style.setProperty(`--${value}-rgb`, hexToRgbString(theme[value]));
        document.documentElement.style.setProperty(`--${value}`, theme[value]);
    }
}

export const { toggleTheme, setBlogs, setProjects, setProgLang } = appSlice.actions;

export default appSlice.reducer;
