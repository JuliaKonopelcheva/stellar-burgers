import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000',
    setupNodeEvents(on, config) {
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: false
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack'
    }
  }
}); 