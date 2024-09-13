import { defineConfig, Schema } from "@julr/vite-plugin-validate-env";

export default defineConfig({
  VITE_API_URL: Schema.string({ format: "url", protocol: true }),
  VITE_CLIENT_URL: Schema.string({ format: "url", protocol: true }),
});
