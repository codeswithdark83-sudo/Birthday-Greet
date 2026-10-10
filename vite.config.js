import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base "/" works on Vercel and Netlify (site served from the domain root),
// so /images/aayushi.jpg and /music/birthday-music.mp3 resolve correctly
// from the public/ folder after deployment.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
