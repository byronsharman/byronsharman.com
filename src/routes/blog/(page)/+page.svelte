<script lang='ts'>
import BackToHome from "$lib/components/BackToHome.svelte";
import BlogGrid from "$lib/components/BlogGrid.svelte";
import type { PageProps } from "./$types";

let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>All Posts</title>
  <meta name="description" content="A complete list of all Byron's blog posts." />
</svelte:head>

<BackToHome />

<header class="my-std lg:my-lg">
  <h1 class="font-semibold text-4xl text-fg-primary dark:text-fg-primary-dark">All Posts</h1>
</header>

<BlogGrid blogs={data.blogs} />
