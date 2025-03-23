import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import EnvironmentPlugin from 'vite-plugin-environment'

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    EnvironmentPlugin(
      {
        VITE_TAPPAY_APP_KEY: '',
        VITE_TAPPAY_APP_ID: '',
        VITE_APPLE_MERCHANT_ID: '',
        VITE_GOOGLE_MERCHANT_ID: '',
      },
      { defineOn: 'import.meta.env' }
    ),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: ".",
  },
  server: {
    host: true, // 讓 Vite 綁定 0.0.0.0，允許內網訪問
    port: 5173, // 可選，設定開發伺服器端口
    allowedHosts: [
      'localhost',
      '127.0.0.1'
    ]
  },
})
