// my first time copy and pasting a script from ChatGPT :P

import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import fs from 'fs-extra';
import { build } from 'vite';

async function runBuild() {
  try {
    console.log('Writing RSS file...');
    try {
      // writeFile will throw an error on Cloudflare since build doesn't exist
      mkdirSync('build');
    } catch {
      // mkdirSync throws an error if the directory already exists
    }
    let xml_output = `
<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title>Byron Sharman</title>
    <link>https://b-sharman.dev/</link>
    <description>The latest blog posts from Byron Sharman</description>
    <language>en-us</language>
    <atom:link href="https://b-sharman.dev/blog.xml" rel="self" type="application/rss+xml"/>
`;
    const data = readFileSync('static/blog/build/index.json');
    for (const [blogSlug, blog] of Object.entries(JSON.parse(data))) {
      xml_output += `    <item>
      <title>${blog.title}</title>
      <description>${blog.preview}</description>
      <link>https://b-sharman.dev/blog/${blogSlug}/</link>
      <guid>https://b-sharman.dev/blog/${blogSlug}/</guid>
      <pubDate>${new Date(blog.date * 1000).toUTCString()}</pubDate>
    </item>
`;
    }
    xml_output += `
  </channel>
</rss>
`;
    writeFileSync('build/blog.xml', xml_output);
    // needed to stop Vite from complaining about not finding blog.xml
    writeFileSync('static/blog.xml', xml_output);

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

