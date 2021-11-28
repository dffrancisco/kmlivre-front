import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Pages from 'vite-plugin-pages';
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    resolve: {
        alias: {
            '@': '/src/',
        },
    },
    plugins: [
        vue(),
        Pages({
            pagesDir: 'src/pages',
            extensions: ['vue'],
            exclude: ["**/components/*.vue"],
        }),
        VitePWA({
            // mode: "development",
            base: "./",
            srcDir: "src",
            filename: "sw.ts",
            includeAssets: ["icon/icon-km-512.png"],
            strategies: "injectManifest",
            manifest: {
                name: "KM Livre",
                short_name: "KmLivre",
                start_url: "./",
                display: "standalone",
                background_color: "#c3cfe2",
                "theme_color": "#c3cfe2",
                "orientation": "portrait",
                "categories": ["Office"],
                "screenshots": [
                    {
                        "src": "screen.png",
                        "sizes": "1104x1104",
                        "type": "image/png"
                    }
                ],
                icons: [
                    {
                        src: "icon/icon-km-256.png",
                        sizes: "256x256",
                        type: "image/png",
                    },
                    {
                        src: "icon/icon-km-256.png",
                        sizes: "256x256",
                        type: "image/png",
                        purpose: "maskable",
                    },
                    {
                        src: "icon/icon-km-512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                    {
                        src: "icon/icon-km-512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "maskable",
                    },
                ],
            },
        }),
    ],
});
