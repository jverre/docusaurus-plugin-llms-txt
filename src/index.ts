import type { Plugin } from '@docusaurus/types';

export default function pluginLLMsTxt(): Plugin {
  return {
    name: 'docusaurus-plugin-llms-txt',

    // Add your plugin methods here
    async loadContent() {
      // Load content
    },

    async contentLoaded({ content, actions }) {
      // Process content
    },

    getPathsToWatch() {
      // Return paths to watch for changes
      return [];
    },

    async postBuild({ outDir }) {
      // Post-build operations
    },
  };
}
