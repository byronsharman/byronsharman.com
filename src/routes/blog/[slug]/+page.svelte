<script lang='ts'>
import "highlight.js/styles/base16/papercolor-light.css";

import { marked } from "marked";

import BackToHome from "$lib/backToHome.svelte";
import BlogCard from "$lib/blogCard.svelte";
import DateP from "$lib/datep.svelte";
import type { PageData } from "./$types";

interface Props {
  data: PageData;
}

let { data }: Props = $props();
</script>

<svelte:head>
  <title>{data.title}</title>
  <meta name="description" content={data.preview} />

  <meta property="og:title" content={data.title} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={data.absoluteUrl} />
  {#if data.previewImage}
    <meta property="og:image" content={data.previewImage.openGraphImageUrl} />
    <meta property="og:image:secure_url" content={data.previewImage.openGraphImageUrl} />
    <meta property="og:image:alt" content={data.previewImage.alt} />
  {/if}
  <meta property="og:description" content={data.preview} />
  <meta property="og:site_name" content="Byron Sharman's blog" />

  {@html `<script type="application/ld+json">${data.ldjson}</script>`}
</svelte:head>

<article class="w-full mt-4 prose text-[17px] my-12 lg:my-24">
  <header class="my-12! lg:my-24!">
    <h1 class="mb-2! text-balance">{data.title}</h1>
    <DateP unixtime={data.date} />
    {#if data.customHeaderMD}
      <small class="block">
        {@html marked(data.customHeaderMD)}
      </small>
    {/if}
  </header>
  {@html data.html}
</article>

<hr class="border-gray-600" />

<section class="my-12 lg:my-24">
  <h2 class="my-12 font-bold text-3xl">Recent Posts</h2>
  <div class="card-list">
    {#each data.recentBlogs as blog}
      <BlogCard blog={blog} />
    {/each}
  </div>
</section>

<BackToHome />
