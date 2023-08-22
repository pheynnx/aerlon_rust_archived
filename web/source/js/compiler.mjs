import { build } from "esbuild";
import { solidPlugin } from "esbuild-plugin-solid";

await build({
  entryPoints: [
    "web/source/js/scripts/navigation.js",
    "web/source/js/pages/admin/admin.tsx",
    "web/source/js/pages/admin_login/admin_login.tsx",
  ],
  entryNames: "[name]-compiled",
  bundle: true,
  minify: true,
  sourcemap: false,
  outdir: "web/static/js",
  plugins: [solidPlugin()],
}).catch(() => process.exit(1));
