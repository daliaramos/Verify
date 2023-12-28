import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";
import tsconfigPaths from 'vite-tsconfig-paths';
import { loadEnv } from 'vite';
// @ts-ignore
// Generates ascii 65-90 (Capital letters) into array Vite is expecting
const alphabet = Array.from(Array(26), (v, k) => {
  return String.fromCharCode(k + 65);
});

export default defineConfig(({ command, mode }) => {
  return {
    plugins: [react(), tsconfigPaths()],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./test/setup.ts",
    },

    envPrefix: alphabet,
    /*
    server:{
      watch: {
        usePolling: true,
      },
      host: true,
      strictPort: true,
      port: 5173,
    },
    build: {
      target: "esnext",
      emptyOutDit: true,
      outDir: "build"
    }
    */
  };
  
  
});

