import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: 'https://github.com/Darshann2001/invoice-generator/', // ✅ EXACT repo name with slashes
})
