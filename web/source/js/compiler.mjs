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
  outdir: "public/js/compiled",
  plugins: [solidPlugin()],
}).catch(() => process.exit(1));
