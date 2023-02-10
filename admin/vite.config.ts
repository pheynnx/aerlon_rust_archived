import { resolve } from 'path';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import copy from 'rollup-plugin-copy';

export default defineConfig({
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
  base: '/public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        admin: resolve(__dirname, 'admin.html'),
        admin_login: resolve(__dirname, 'admin_login.html'),
        admin_new: resolve(__dirname, 'admin_new.html'),
        admin_update: resolve(__dirname, 'admin_update.html'),
      },
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }
          return `${extType}/[name]-builder[extname]`;
        },
        chunkFileNames: 'js/[name]-builder.js',
        entryFileNames: 'js/[name]-builder.js',
      },
    },
  },
  plugins: [
    solidPlugin(),
    copy({
      targets: [
        { src: 'dist/*.html', dest: '../templates/compiled/' },
        { src: 'dist/js/*', dest: '../public/js' },
        { src: 'dist/css/*', dest: '../public/styles' },
      ],
      hook: 'writeBundle',
      verbose: true,
    }),
  ],
});
