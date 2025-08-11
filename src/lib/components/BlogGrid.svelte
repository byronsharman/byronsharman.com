<script lang='ts'>
import BlogCard from "$lib/components/BlogCard.svelte";
import type { PageProps } from "./$types";

let { blogs }: PageProps = $props();
</script>

<div class="grid md:grid-cols-3 gap-std">
  {#each blogs as blog}
    <BlogCard blog={blog} />
  {/each}
</div>
