<script lang='ts'>
import BackToHome from "$lib/components/BackToHome.svelte";
import BlogGrid from "$lib/components/BlogGrid.svelte";
import type { PageProps } from "./$types";

let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>Experience</title>
  <meta name="description" content="A complete list of all Byron's blog posts." />
</svelte:head>

<BackToHome />

<header class="my-std lg:my-lg">
  <h1 class="font-semibold text-4xl text-fg-primary dark:text-fg-primary-dark">All Posts</h1>
</header>

<ol class="space-y-8 sm:space-y-4">
  {#each data.blogs as blog}
    <li>
      <a class="block py-6 rounded-2xl border border-transparent hover:border-neutral-200 hover:dark:border-black hover:bg-white dark:hover:bg-neutral-900 hover:border dark:hover:shadow-neutral-900 hover:shadow-lg transition" href={`/blog/${blog.slug}`}>
        <article class="flex flex-col sm:flex-row gap-1 sm:gap-12">
          <p class="sm:w-[18ch] sm:text-right text-gray-700">{new Intl.DateTimeFormat(undefined, { dateStyle: "long" }).format(new Date(blog.date * 1000))}</p>
          <div>
            <h2 class="font-semibold">{blog.title}</h2>
            <p>{blog.description}</p>
          </div>
        </article>
      </a>
    </li>
  {/each}
</ol>
