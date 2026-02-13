import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
   theme: {
    extend: {
      keyframes: {
        floatHeart: {
          "0%": {
            opacity: "1",
            transform: "translateY(0) rotate(45deg) scale(1)",
          },
          "100%": {
            opacity: "0",
            transform: "translateY(-40px) rotate(45deg) scale(0.6)",
          },
        },
      },
      animation: {
        floatHeart: "floatHeart 1s ease-out forwards",
      },
    },
  },
  plugins: [tailwindcss(), react()],
})

