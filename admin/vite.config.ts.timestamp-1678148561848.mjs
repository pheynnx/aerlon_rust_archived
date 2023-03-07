// vite.config.ts
import { resolve } from "path";
import { defineConfig } from "file:///C:/Users/Eric/Desktop/eac-v5/admin/node_modules/.pnpm/vite@4.1.4_tbu6ibuzbmq2zng52hwcifltki/node_modules/vite/dist/node/index.js";
import solidPlugin from "file:///C:/Users/Eric/Desktop/eac-v5/admin/node_modules/.pnpm/vite-plugin-solid@2.6.1_solid-js@1.6.12+vite@4.1.4/node_modules/vite-plugin-solid/dist/esm/index.mjs";
import copy from "file:///C:/Users/Eric/Desktop/eac-v5/admin/node_modules/.pnpm/rollup-plugin-copy@3.4.0/node_modules/rollup-plugin-copy/dist/index.commonjs.js";
var __vite_injected_original_dirname = "C:\\Users\\Eric\\Desktop\\eac-v5\\admin";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "~": resolve(__vite_injected_original_dirname, "src")
    }
  },
  base: "/public",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        admin: resolve(__vite_injected_original_dirname, "admin.html"),
        admin_login: resolve(__vite_injected_original_dirname, "admin_login.html")
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxFcmljXFxcXERlc2t0b3BcXFxcZWFjLXY1XFxcXGFkbWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxFcmljXFxcXERlc2t0b3BcXFxcZWFjLXY1XFxcXGFkbWluXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9FcmljL0Rlc2t0b3AvZWFjLXY1L2FkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuXG5pbXBvcnQgc29saWRQbHVnaW4gZnJvbSBcInZpdGUtcGx1Z2luLXNvbGlkXCI7XG5pbXBvcnQgY29weSBmcm9tIFwicm9sbHVwLXBsdWdpbi1jb3B5XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJ+XCI6IHJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKSxcbiAgICB9LFxuICB9LFxuICBiYXNlOiBcIi9wdWJsaWNcIixcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6IFwiZGlzdFwiLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIGFkbWluOiByZXNvbHZlKF9fZGlybmFtZSwgXCJhZG1pbi5odG1sXCIpLFxuICAgICAgICBhZG1pbl9sb2dpbjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiYWRtaW5fbG9naW4uaHRtbFwiKSxcbiAgICAgIH0sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgYXNzZXRGaWxlTmFtZXM6IChhc3NldEluZm8pID0+IHtcbiAgICAgICAgICBsZXQgZXh0VHlwZSA9IGFzc2V0SW5mby5uYW1lLnNwbGl0KFwiLlwiKS5hdCgxKTtcbiAgICAgICAgICBpZiAoL3BuZ3xqcGU/Z3xzdmd8Z2lmfHRpZmZ8Ym1wfGljby9pLnRlc3QoZXh0VHlwZSkpIHtcbiAgICAgICAgICAgIGV4dFR5cGUgPSBcImltZ1wiO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gYCR7ZXh0VHlwZX0vW25hbWVdLWFzc2V0W2V4dG5hbWVdYDtcbiAgICAgICAgfSxcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6IFwianMvW25hbWVdLWNodW5rLmpzXCIsXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiBcImpzL1tuYW1lXS1lbnRyeS5qc1wiLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgc29saWRQbHVnaW4oKSxcbiAgICBjb3B5KHtcbiAgICAgIHRhcmdldHM6IFtcbiAgICAgICAgeyBzcmM6IFwiZGlzdC8qLmh0bWxcIiwgZGVzdDogXCIuLi90ZW1wbGF0ZXMvY29tcGlsZWQvXCIgfSxcbiAgICAgICAgeyBzcmM6IFwiZGlzdC9qcy8qXCIsIGRlc3Q6IFwiLi4vcHVibGljL2pzXCIgfSxcbiAgICAgICAgeyBzcmM6IFwiZGlzdC9jc3MvKlwiLCBkZXN0OiBcIi4uL3B1YmxpYy9jc3NcIiB9LFxuICAgICAgXSxcbiAgICAgIGhvb2s6IFwid3JpdGVCdW5kbGVcIixcbiAgICAgIHZlcmJvc2U6IHRydWUsXG4gICAgfSksXG4gIF0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1MsU0FBUyxlQUFlO0FBQzVULFNBQVMsb0JBQW9CO0FBRTdCLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sVUFBVTtBQUpqQixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLElBQy9CO0FBQUEsRUFDRjtBQUFBLEVBQ0EsTUFBTTtBQUFBLEVBQ04sT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBQ0wsT0FBTyxRQUFRLGtDQUFXLFlBQVk7QUFBQSxRQUN0QyxhQUFhLFFBQVEsa0NBQVcsa0JBQWtCO0FBQUEsTUFDcEQ7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLGdCQUFnQixDQUFDLGNBQWM7QUFDN0IsY0FBSSxVQUFVLFVBQVUsS0FBSyxNQUFNLEdBQUcsRUFBRSxHQUFHLENBQUM7QUFDNUMsY0FBSSxrQ0FBa0MsS0FBSyxPQUFPLEdBQUc7QUFDbkQsc0JBQVU7QUFBQSxVQUNaO0FBQ0EsaUJBQU8sR0FBRztBQUFBLFFBQ1o7QUFBQSxRQUNBLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLFlBQVk7QUFBQSxJQUNaLEtBQUs7QUFBQSxNQUNILFNBQVM7QUFBQSxRQUNQLEVBQUUsS0FBSyxlQUFlLE1BQU0seUJBQXlCO0FBQUEsUUFDckQsRUFBRSxLQUFLLGFBQWEsTUFBTSxlQUFlO0FBQUEsUUFDekMsRUFBRSxLQUFLLGNBQWMsTUFBTSxnQkFBZ0I7QUFBQSxNQUM3QztBQUFBLE1BQ0EsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLElBQ1gsQ0FBQztBQUFBLEVBQ0g7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
