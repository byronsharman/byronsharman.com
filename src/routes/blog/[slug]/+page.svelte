<script lang='ts'>
import { MediaQuery } from "svelte/reactivity";

import BackToHome from "$lib/components/BackToHome.svelte";
import BlogCard from "$lib/components/BlogCard.svelte";
import CardList from "$lib/components/CardList.svelte";
import DateP from "$lib/components/DateP.svelte";
import type { PageProps } from "./$types";

import darkThemeUrl from "$lib/assets/styles/dark.css?url";
import lightThemeUrl from "$lib/assets/styles/light.css?url";

const darkMode = new MediaQuery("prefers-color-scheme: dark");
const syntaxHighlightingSrc = $derived(
  darkMode.current ? darkThemeUrl : lightThemeUrl,
);

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

  <link rel="stylesheet" href={syntaxHighlightingSrc} />

  {@html `<script type="application/ld+json">${data.ldjson}</script>`}
</svelte:head>

<article class="prose dark:prose-invert text-[17px] my-12 lg:my-24">
  <header class="my-12! lg:my-24!">
    <h1 class="mb-sm! text-pretty lg:text-balance">{data.title}</h1>
    <DateP unixtime={data.date} />
  </header>
  {@html data.html}
</article>

<hr class="border-fg-tertiary dark:border-fg-tertiary-dark" />

<section class="mt-12 lg:mt-24">
  <h2 class="my-12 font-bold text-3xl text-fg-primary dark:text-fg-primary-dark">Recent Posts</h2>
  <CardList>
    {#each data.recentBlogs as blog}
      <BlogCard blog={blog} />
    {/each}
  </CardList>
</section>

<BackToHome />
