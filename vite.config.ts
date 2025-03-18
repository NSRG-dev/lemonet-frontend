import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "tao-sweeps.online",
    allowedHosts: ["tao-sweeps.online"],
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
