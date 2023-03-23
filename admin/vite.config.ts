import { resolve } from "path";
import { defineConfig } from "vite";
import devtools from "solid-devtools/vite";

import solidPlugin from "vite-plugin-solid";
import copy from "rollup-plugin-copy";

export default defineConfig({
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      "/admin": {
        target: "http://127.0.0.1:8040",
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: "127.0.0.1",
      },
    },
  },
  base: "/public",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        admin: resolve(__dirname, "admin.html"),
        admin_login: resolve(__dirname, "admin_login.html"),
      },
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".").at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "img";
          }
          return `${extType}/[name]-asset[extname]`;
        },
        chunkFileNames: "js/[name]-chunk.js",
        entryFileNames: "js/[name]-entry.js",
      },
    },
  },
  plugins: [
    solidPlugin(),
    devtools(),
    copy({
      targets: [
        { src: "dist/*.html", dest: "../templates/compiled/" },
        { src: "dist/js/*", dest: "../public/js" },
        { src: "dist/css/*", dest: "../public/css" },
      ],
      hook: "writeBundle",
      verbose: true,
    }),
  ],
});
