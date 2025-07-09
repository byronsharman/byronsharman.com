<script lang='ts'>
import DateP from "$lib/components/DateP.svelte";
import type { BlogCardData } from "$lib/types";

interface Props {
  blog: BlogCardData;
}

let { blog }: Props = $props();
</script>

<article class="card">
  <a href={blog.url}>
    <h3 class="text-pretty">{blog.title}</h3>
    <p class="grow mb-2 line-clamp-3 text-gray-700">{blog.preview}</p>
    <DateP unixtime={blog.date} />
  </a>
</article>
