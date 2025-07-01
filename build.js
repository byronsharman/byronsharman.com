import * as fs from "node:fs/promises";
import { build } from "vite";

async function buildProcess() {
  console.log("Writing RSS file...");
  try {
    // writeFile will throw an error on Cloudflare since build doesn't exist
    await fs.mkdir("build");
  } catch {
    // mkdirSync throws an error if the directory already exists
  }
  const initial_xml = `\
<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title>Byron Sharman</title>
    <link>https://byronsharman.com/</link>
    <description>The latest blog posts from Byron Sharman</description>
    <language>en-us</language>
    <atom:link href="https://byronsharman.com/blog.xml" rel="self" type="application/rss+xml"/>`;
  const data = await fs.readFile("static/blog/index.json", {
    encoding: "utf8",
  });
  const xml_output = Object.entries(JSON.parse(data))
    .filter(([_, blog]) => blog.published)
    .reduce(
      (output, [blogSlug, blog]) => `\
${output}
    <item>
      <title>${blog.title}</title>
      <description>${blog.preview}</description>
      <link>https://byronsharman.com/blog/${blogSlug}</link>
      <guid>https://byronsharman.com/blog/${blogSlug}</guid>
      <pubDate>${new Date(blog.date * 1000).toUTCString()}</pubDate>
    </item>`,
      initial_xml,
    )
    .concat(`
  </channel>
</rss>
`);
  await fs.writeFile("build/blog.xml", xml_output);
  // needed to stop Vite from complaining about not finding blog.xml
  await fs.writeFile("static/blog.xml", xml_output);

  // Run Vite build
  console.log("Building Svelte project with Vite...");
  await build();
  console.log("Vite build successful.");

  // Remove the assets we don't want to ship
  console.log("Removing unnecessary assets...");
  await fs.rm("build/blog/build", { recursive: true });

  console.log("Build process completed successfully.");
}

async function runBuild() {
  try {
    await buildProcess();
  } catch (error) {
    console.error("Error during build process:", error);
    process.exit(1);
  }
}

runBuild();
