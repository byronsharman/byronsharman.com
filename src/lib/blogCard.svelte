<script lang='ts'>
import DateP from "$lib/datep.svelte";
import type { BlogCardData } from "$lib/types";

interface Props {
  blog: BlogCardData;
}

let { blog }: Props = $props();
</script>

<li class="border border-gray-200 hover:border-gray-400 rounded-xl">
  <a href={blog.url} class="flex flex-col size-full p-4 rounded-lg">
    <h3 class="font-bold text-xl mb-3 text-pretty">{blog.title}</h3>
    <p class="grow mb-2 line-clamp-3">{blog.preview}</p>
    <DateP unixtime={blog.date} />
  </a>
</li>
