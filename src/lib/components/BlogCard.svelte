<script lang='ts'>
import DateP from "$lib/components/DateP.svelte";
import ResponsiveImage from "$lib/components/ResponsiveImage.svelte";
import type { BlogCardData } from "$lib/types";

let { blog }: { blog: BlogCardData } = $props();

if (blog.mode === "featured" && blog.picture === undefined) {
  throw new Error(`blogs must have an image to be featured (${blog.slug})`);
}
if (blog.mode === "image" && blog.picture === undefined) {
  throw new Error(
    `blog card has mode 'image' but its picture is undefined (${blog.slug})`,
  );
}
</script>

<a href={blog.url} class={[blog.mode === "featured" && "order-first", (blog.mode === "featured" || blog.mode === "image") && "row-span-2", "block sm:p-6 md:p-8 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-black dark:shadow-neutral-900 hover:shadow-lg transition"]}>
  <article class="card">
    {#if (blog.mode === "featured" || blog.mode === "image") && blog.picture !== undefined}
      <ResponsiveImage
        picture={blog.picture}
        lazy={blog.mode === "image"}
        sizes={
          blog.mode === "featured"
          ? "(min-width: 48rem) calc(calc(min(1280px, calc(100vw - 4rem)) * 0.4) - 4rem), calc(100vw - 6rem)"
          : "(min-width: 48rem) calc(calc(min(1280px, calc(100vw - 4rem)) / 3) - 4rem), calc(100vw - 6rem)"
        }
        class_="rounded-t-lg sm:rounded-lg sm:mb-4"
      />
    {/if}
    <div class="p-6 sm:p-0">
      <h3 class={["card-heading text-pretty", blog.mode === "featured" && "text-2xl"]}>{blog.title}</h3>
      <p class={["grow my-sm line-clamp-3 text-fg-secondary dark:text-fg-secondary-dark", blog.mode === "featured" && "text-lg"]}>{blog.description}</p>
      <DateP unixtime={blog.date} small />
    </div>
  </article>
</a>
