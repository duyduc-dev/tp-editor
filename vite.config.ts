import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

import ViteFederation from './configs/federation';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(), ViteFederation(env)],
    build: {
      modulePreload: false,
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    preview: {
      port: Number(env.VITE_PORT),
      strictPort: true,
    },
    server: {
      port: Number(env.VITE_PORT),
      host: true,
      strictPort: true,
      headers: {
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Resource-Policy': 'same-site',
      },
    },
  };
});
