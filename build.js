// my first time copy and pasting a script from ChatGPT :P

import fs from 'fs-extra';
import { build } from 'vite';

async function runBuild() {
  try {
    // Process your assets here before building

    // Run Vite build
    console.log('Building Svelte project with Vite...');
    await build();
    console.log('Vite build successful.');

    // Remove the assets you don't want to ship
    console.log('Removing unnecessary assets...');
    await fs.remove('build/blog/build');

    console.log('Build process completed successfully.');
  } catch (error) {
    console.error('Error during build process:', error);
    process.exit(1);
  }
}

runBuild();

