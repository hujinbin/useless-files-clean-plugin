import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const UselessFilesCleanPlugin = require('../../lib/index')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UselessFilesCleanPlugin(),
  ],
})
