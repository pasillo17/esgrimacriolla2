import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    // Base relativa asegura que los assets carguen bien sin importar la ruta en Netlify
    base: './',
    define: {
      // Reemplazo seguro solo para la API KEY, preservando otras variables de Node/Vite
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});
