<script lang='ts'>
import DateP from "$lib/components/DateP.svelte";
import ResponsiveImage from "$lib/components/ResponsiveImage.svelte";
import type { BlogCardData } from "$lib/types";

let { blog }: { blog: BlogCardData } = $props();

if (blog.featured && blog.picture === undefined) {
  throw new Error(`blogs must have an image to be featured (${blog.slug})`);
}
</script>

<a href={blog.url} class="block p-6 bg-white dark:bg-bg-secondary-dark rounded-lg border border-stone-200 hover:shadow-lg transition">
  <article class="card">
    {#if blog.featured && blog.picture !== undefined}
      <ResponsiveImage
        picture={blog.picture}
        lazy={false}
        sizes="(min-resolution: 3dppx) calc(33vw * 0.667), 33vw"
      />
    {/if}
    <h3 class="card-heading text-pretty">{blog.title}</h3>
    <p class="grow my-sm line-clamp-3 text-fg-secondary dark:text-fg-secondary-dark">{blog.description}</p>
    <DateP unixtime={blog.date} small />
  </article>
</a>
