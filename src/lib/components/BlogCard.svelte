<script lang='ts'>
import DateP from "$lib/components/DateP.svelte";
import type { BlogCardData } from "$lib/types";

let { blog }: { blog: BlogCardData } = $props();
</script>

<a href={blog.url} class="block p-6 bg-white dark:bg-bg-secondary-dark rounded-lg border border-stone-200 hover:shadow-lg transition">
  <article class="card">
    <h3 class="card-heading text-pretty">{blog.title}</h3>
    <p class="grow my-sm line-clamp-3 text-fg-secondary dark:text-fg-secondary-dark">{blog.description}</p>
    <DateP unixtime={blog.date} small />
  </article>
</a>
