import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'e95v7i',
  e2e: {
    baseUrl: 'http://localhost:3004',
    experimentalSessionAndOrigin: true,
  },
  watchForFileChanges: false,
});
