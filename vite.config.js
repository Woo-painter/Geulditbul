import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import typography from "@tailwindcss/typography";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), typography],
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
});
