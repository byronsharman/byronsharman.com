<script lang='ts'>
import BackToHome from "$lib/components/BackToHome.svelte";
import BlogCard from "$lib/components/BlogCard.svelte";
import CardList from "$lib/components/CardList.svelte";
import DateP from "$lib/components/DateP.svelte";
import type { PageProps } from "./$types";

import syntaxHighlighting from "$lib/assets/styles/syntax-highlighting.css?url";

let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>{data.title}</title>
  <meta name="description" content={data.description} />

  <meta property="og:title" content={data.title} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={data.absoluteUrl} />
  {#if data.previewImage}
    <meta property="og:image" content={data.previewImage.ogUrl} />
    <meta property="og:image:secure_url" content={data.previewImage.ogUrl} />
    <meta property="og:image:alt" content={data.previewImage.alt} />
  {/if}
  <meta property="og:description" content={data.description} />
  <meta property="og:site_name" content="Byron Sharman" />

  {#if data.requiresHighlight}
    <link rel="stylesheet" href={syntaxHighlighting} />
  {/if}

  {@html `<script type="application/ld+json">${data.ldjson}</script>`}
</svelte:head>

<BackToHome />

<article class="w-full max-w-(--content-width) prose dark:prose-invert text-[17px]">
  <header class="mt-std lg:mt-lg">
    <h1 class="mb-sm! text-pretty lg:text-balance">{data.title}</h1>
    <DateP unixtime={data.date} />
  </header>
  {@html data.html}
</article>

<hr class="my-12 lg:my-24 w-48 border-fg-tertiary dark:border-fg-tertiary-dark" />

<CardList>
  <h2 class="mb-12 font-bold text-3xl text-fg-primary dark:text-fg-primary-dark">Recent Posts</h2>
  {#each data.recentBlogs as blog}
    <BlogCard blog={blog} />
  {/each}
</CardList>
