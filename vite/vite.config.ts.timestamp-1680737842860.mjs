// vite.config.ts
import { resolve } from "path";
import { defineConfig } from "file:///C:/Users/ericarthurc/Desktop/EAC_PROD/vite/node_modules/.pnpm/vite@4.2.1_@types+node@18.15.11_sass@1.60.0/node_modules/vite/dist/node/index.js";
import solidPlugin from "file:///C:/Users/ericarthurc/Desktop/EAC_PROD/vite/node_modules/.pnpm/vite-plugin-solid@2.7.0_solid-js@1.7.2_vite@4.2.1/node_modules/vite-plugin-solid/dist/esm/index.mjs";
import copy from "file:///C:/Users/ericarthurc/Desktop/EAC_PROD/vite/node_modules/.pnpm/rollup-plugin-copy@3.4.0/node_modules/rollup-plugin-copy/dist/index.commonjs.js";
var __vite_injected_original_dirname = "C:\\Users\\ericarthurc\\Desktop\\EAC_PROD\\vite";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "~": resolve(__vite_injected_original_dirname, "src")
    }
  },
  server: {
    proxy: {
      "/admin": {
        target: "http://127.0.0.1:8040",
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: "127.0.0.1"
      }
    }
  },
  base: "/public",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        admin: resolve(__vite_injected_original_dirname, "admin.html"),
        admin_login: resolve(__vite_injected_original_dirname, "admin_login.html"),
        rng: resolve(__vite_injected_original_dirname, "rng.html")
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
        entryFileNames: "js/[name]-entry.js"
      }
    }
  },
  plugins: [
    solidPlugin(),
    copy({
      targets: [
        { src: "dist/*.html", dest: "../templates/compiled/" },
        { src: "dist/js/*", dest: "../public/js" },
        { src: "dist/css/*", dest: "../public/css" }
      ],
      hook: "writeBundle",
      verbose: true
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxlcmljYXJ0aHVyY1xcXFxEZXNrdG9wXFxcXEVBQ19QUk9EXFxcXHZpdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGVyaWNhcnRodXJjXFxcXERlc2t0b3BcXFxcRUFDX1BST0RcXFxcdml0ZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvZXJpY2FydGh1cmMvRGVza3RvcC9FQUNfUFJPRC92aXRlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuXG5pbXBvcnQgc29saWRQbHVnaW4gZnJvbSBcInZpdGUtcGx1Z2luLXNvbGlkXCI7XG5pbXBvcnQgY29weSBmcm9tIFwicm9sbHVwLXBsdWdpbi1jb3B5XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJ+XCI6IHJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKSxcbiAgICB9LFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBwcm94eToge1xuICAgICAgXCIvYWRtaW5cIjoge1xuICAgICAgICB0YXJnZXQ6IFwiaHR0cDovLzEyNy4wLjAuMTo4MDQwXCIsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgc2VjdXJlOiBmYWxzZSxcbiAgICAgICAgY29va2llRG9tYWluUmV3cml0ZTogXCIxMjcuMC4wLjFcIixcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgYmFzZTogXCIvcHVibGljXCIsXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiBcImRpc3RcIixcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBpbnB1dDoge1xuICAgICAgICBhZG1pbjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiYWRtaW4uaHRtbFwiKSxcbiAgICAgICAgYWRtaW5fbG9naW46IHJlc29sdmUoX19kaXJuYW1lLCBcImFkbWluX2xvZ2luLmh0bWxcIiksXG4gICAgICAgIHJuZzogcmVzb2x2ZShfX2Rpcm5hbWUsIFwicm5nLmh0bWxcIiksXG4gICAgICB9LFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAoYXNzZXRJbmZvKSA9PiB7XG4gICAgICAgICAgbGV0IGV4dFR5cGUgPSBhc3NldEluZm8ubmFtZS5zcGxpdChcIi5cIikuYXQoMSk7XG4gICAgICAgICAgaWYgKC9wbmd8anBlP2d8c3ZnfGdpZnx0aWZmfGJtcHxpY28vaS50ZXN0KGV4dFR5cGUpKSB7XG4gICAgICAgICAgICBleHRUeXBlID0gXCJpbWdcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGAke2V4dFR5cGV9L1tuYW1lXS1hc3NldFtleHRuYW1lXWA7XG4gICAgICAgIH0sXG4gICAgICAgIGNodW5rRmlsZU5hbWVzOiBcImpzL1tuYW1lXS1jaHVuay5qc1wiLFxuICAgICAgICBlbnRyeUZpbGVOYW1lczogXCJqcy9bbmFtZV0tZW50cnkuanNcIixcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHNvbGlkUGx1Z2luKCksXG4gICAgY29weSh7XG4gICAgICB0YXJnZXRzOiBbXG4gICAgICAgIHsgc3JjOiBcImRpc3QvKi5odG1sXCIsIGRlc3Q6IFwiLi4vdGVtcGxhdGVzL2NvbXBpbGVkL1wiIH0sXG4gICAgICAgIHsgc3JjOiBcImRpc3QvanMvKlwiLCBkZXN0OiBcIi4uL3B1YmxpYy9qc1wiIH0sXG4gICAgICAgIHsgc3JjOiBcImRpc3QvY3NzLypcIiwgZGVzdDogXCIuLi9wdWJsaWMvY3NzXCIgfSxcbiAgICAgIF0sXG4gICAgICBob29rOiBcIndyaXRlQnVuZGxlXCIsXG4gICAgICB2ZXJib3NlOiB0cnVlLFxuICAgIH0pLFxuICBdLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRULFNBQVMsZUFBZTtBQUNwVixTQUFTLG9CQUFvQjtBQUU3QixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLFVBQVU7QUFKakIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxJQUMvQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLFVBQVU7QUFBQSxRQUNSLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFFBQVE7QUFBQSxRQUNSLHFCQUFxQjtBQUFBLE1BQ3ZCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQU07QUFBQSxFQUNOLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNiLE9BQU87QUFBQSxRQUNMLE9BQU8sUUFBUSxrQ0FBVyxZQUFZO0FBQUEsUUFDdEMsYUFBYSxRQUFRLGtDQUFXLGtCQUFrQjtBQUFBLFFBQ2xELEtBQUssUUFBUSxrQ0FBVyxVQUFVO0FBQUEsTUFDcEM7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLGdCQUFnQixDQUFDLGNBQWM7QUFDN0IsY0FBSSxVQUFVLFVBQVUsS0FBSyxNQUFNLEdBQUcsRUFBRSxHQUFHLENBQUM7QUFDNUMsY0FBSSxrQ0FBa0MsS0FBSyxPQUFPLEdBQUc7QUFDbkQsc0JBQVU7QUFBQSxVQUNaO0FBQ0EsaUJBQU8sR0FBRztBQUFBLFFBQ1o7QUFBQSxRQUNBLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLFlBQVk7QUFBQSxJQUNaLEtBQUs7QUFBQSxNQUNILFNBQVM7QUFBQSxRQUNQLEVBQUUsS0FBSyxlQUFlLE1BQU0seUJBQXlCO0FBQUEsUUFDckQsRUFBRSxLQUFLLGFBQWEsTUFBTSxlQUFlO0FBQUEsUUFDekMsRUFBRSxLQUFLLGNBQWMsTUFBTSxnQkFBZ0I7QUFBQSxNQUM3QztBQUFBLE1BQ0EsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLElBQ1gsQ0FBQztBQUFBLEVBQ0g7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
