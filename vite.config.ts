import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import vitePath from 'vite-tsconfig-paths'
import viteSvgr from 'vite-plugin-svgr'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vitePath(), viteSvgr(), viteSingleFile()],
  optimizeDeps: {
    exclude: ['react-virtualization']
  }
})
