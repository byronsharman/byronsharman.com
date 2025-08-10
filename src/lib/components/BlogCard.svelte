<script lang='ts'>
import DateP from "$lib/components/DateP.svelte";
import type { BlogCardData } from "$lib/types";

let { blog }: { blog: BlogCardData } = $props();

const img = $derived(
  blog.featured && blog.picture !== undefined
  ? Object.entries(blog.picture.sources)
      .map(
        ([format, srcset]) => `\
  <source
    srcset="${srcset}"
    type="image/${format}"
    sizes="
      (max-width: 700px) and (min-resolution: 3dppx) 66vw,
      (max-width: 700px) 100vw,
      min(700px, ${blog.picture.img.w}px)"
  />`,
    )
      .reduce((acc, current) => acc + current, "<picture>")
      .concat(`\
<img
  src=${blog.picture.img.src}
  alt="${blog.picture.alt}"
  width="${blog.picture.img.w}"
  height="${blog.picture.img.h}"
  fetchpriority="high"
/></picture>`)
  : undefined
);

if (blog.featured && blog.picture === undefined) {
  throw new Error(`blogs must have an image to be featured (${blog.slug})`);
}
</script>

<a href={blog.url} class="block p-6 bg-white dark:bg-bg-secondary-dark rounded-lg border border-stone-200 hover:shadow-lg transition">
  <article class="card">
    {#if img}
      {@html img}
    {/if}
    <h3 class="card-heading text-pretty">{blog.title}</h3>
    <p class="grow my-sm line-clamp-3 text-fg-secondary dark:text-fg-secondary-dark">{blog.description}</p>
    <DateP unixtime={blog.date} small />
  </article>
</a>
