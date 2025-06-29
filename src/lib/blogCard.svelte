<script lang='ts'>
import DateP from "$lib/datep.svelte";
import type { BlogCardData } from "$lib/types";

interface Props {
  blog: BlogCardData;
}

let { blog }: Props = $props();
</script>

<li>
  <a href={blog.url} class="block p-4 lg:p-6 bg-white border-2 border-transparent rounded-xl shadow-xs">
    <p class="font-bold text-xl mb-3 text-pretty">{blog.title}</p>
    <p class="grow mb-2 line-clamp-3 text-gray-800">{blog.preview}</p>
    <DateP unixtime={blog.date} />
  </a>
</li>
