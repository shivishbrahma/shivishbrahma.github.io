import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const urls = {
    "prod": "https://shivishbrahma.github.io/",
    "it": "https://shivishbrahma.xyz/",
    "dev": "http://localhost:5173/"
}

export default defineConfig(({command, mode}) => ({
    base: "/",
    define: {
        "process.env.PUBLIC_URL": JSON.stringify(
            urls[mode ?? "dev"]
        ),
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    },
    plugins: [react({})],
    resolve: {
        extensions: [".js", ".jsx", ".json"],
        alias: {
            "@": path.resolve("src")
        }
    }
}));
