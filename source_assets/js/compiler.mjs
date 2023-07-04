import { build } from "esbuild";
import { solidPlugin } from "esbuild-plugin-solid";

await build({
  entryPoints: [
    "source_assets/js/scripts/navigation.js",
    "source_assets/js/scripts/timeThemer.js",
    "source_assets/js/pages/admin/admin.tsx",
    "source_assets/js/pages/admin_login/admin_login.tsx",
  ],
  entryNames: "[name]-compiled",
  bundle: true,
  minify: true,
  sourcemap: false,
  outdir: "public/js/compiled",
  plugins: [solidPlugin()],
}).catch(() => process.exit(1));
