import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
<<<<<<< HEAD
	plugins: [react()],
	server: {
		host: 'tao-sweeps.online',
		allowedHosts: ['tao-sweeps.online'],
	},
	resolve: {
		alias: {
			'@': '/src',
		},
	},
})
=======
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
>>>>>>> c8cf6607152145283e1fd46b69c1320e98feabfd
