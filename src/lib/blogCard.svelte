<script lang='ts'>
import DateP from "$lib/datep.svelte";
import type { BlogCardData } from "$lib/types";

interface Props {
  blog: BlogCardData;
}

let { blog }: Props = $props();
</script>

<li class="card">
  <!-- These classes are to make the suggestion grid look even -->
  <a href={blog.url}>
    <h2 class="font-bold text-xl mb-3 text-pretty">{blog.title}</h2>
    <p class="grow mb-2 line-clamp-3 text-gray-800">{blog.preview}</p>
    <DateP unixtime={blog.date} />
  </a>
</li>
