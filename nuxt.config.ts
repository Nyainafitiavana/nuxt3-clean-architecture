// Nuxt 3 configuration file
// This file configures the Nuxt framework with all required modules and settings.

export default defineNuxtConfig({
  // Configure modules
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],

  // TypeScript configuration
  typescript: {
    strict: true,
    shim: false,
  },

  // Runtime configuration
  // Values in 'public' are exposed to the browser
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3001',
    },
  },

  // Pinia configuration
  pinia: {
    storesDirName: 'stores',
  },

  // CSS and styling
  css: ['~/assets/css/main.css'],

  // Source directory
  srcDir: 'src',

  // Build configuration
  build: {
    transpile: ['axios'],
  },

  // Vite configuration
  vite: {
    server: {
      hmr: {
        protocol: 'ws',
        host: 'localhost',
      },
    },
  },
});
