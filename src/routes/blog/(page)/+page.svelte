<script lang='ts'>
import BackToHome from "$lib/components/BackToHome.svelte";
import BlogCard from "$lib/components/BlogCard.svelte";
import type { PageProps } from "./$types";

let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>Experience</title>
  <meta name="description" content="A complete list of all Byron's blog posts." />
</svelte:head>

<BackToHome />

<header class="my-std lg:my-lg">
  <h1 class="font-bold text-4xl text-fg-primary dark:text-fg-primary-dark">All Posts</h1>
</header>

<div class="grid md:grid-cols-3 gap-std">
  {#each data.blogs as blog}
    <BlogCard blog={blog} />
  {/each}
</div>
