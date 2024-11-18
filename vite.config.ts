import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import eslint from "vite-plugin-eslint"
import {robots} from "vite-plugin-robots"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), eslint(), robots()],
})
