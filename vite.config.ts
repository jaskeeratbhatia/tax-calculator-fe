// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    exclude: [...configDefaults.exclude, 'node_modules/*'],
    deps: {
      inline: [/react-i18next/, /@chakra-ui\/react/], // Force Vitest to inline these dependencies
    },
  },
});
