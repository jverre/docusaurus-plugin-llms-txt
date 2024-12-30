import type { Plugin } from '@docusaurus/types';
import type { PluginOptions } from './options';
import { extractRoutesMetadata } from './parseDocuments';
import { generateLLMsTxt, generateFullLLMsTxt } from './createLLMsTxtFiles';
import logger from '@docusaurus/logger';
import fs from 'fs-extra';
import path from 'path';

const pluginName = 'docusaurus-plugin-llms-txt';

function validateOptions(options: any): PluginOptions {
  if (options.title === undefined) {
    throw new Error('title configuration for docusaurus-plugin-llms-txt is mandatory.');
  }
  
  return {
    title: options.title || 'LLMs.txt',
    description: options.description || '',
    fullLLMsTxt: options.fullLLMsTxt || false,
  };
}

async function writeLLMsTxtFile(llmsTxt: string, outDir: string) {
  const llmsTxtPath = path.join(outDir, 'llms.txt');
  try {
    await fs.outputFile(llmsTxtPath, llmsTxt);
  } catch (err) {
    logger.error('Writing llms.txt failed');
    throw err;
  }
}

async function writeLLMsFullTxtFile(llmsFullTxt: string, outDir: string) {
  const llmsFullTxtPath = path.join(outDir, 'llms-full.txt');
  try {
    await fs.outputFile(llmsFullTxtPath, llmsFullTxt);
  } catch (err) {
    logger.error('Writing llms-full.txt failed');
    throw err;
  }
}

export default function pluginLLMsTxt(
  options: PluginOptions,
): Plugin {
  return {
    name: pluginName,

    async postBuild({ siteConfig, routes, outDir }) {
      const routesMetadata = extractRoutesMetadata(routes, siteConfig);

      const llmsTxt = generateLLMsTxt(routesMetadata, options);
      writeLLMsTxtFile(llmsTxt, outDir);

      if (options.fullLLMsTxt) {
        const llmsFullTxt = generateFullLLMsTxt(routesMetadata, options);
        writeLLMsFullTxtFile(llmsFullTxt, outDir);
      }
    }
  }
}
