<script lang='ts'>
import AllPosts from "$lib/components/AllPosts.svelte";
import BackToHome from "$lib/components/BackToHome.svelte";
import BlogGrid from "$lib/components/BlogGrid.svelte";
import Footer from "$lib/components/Footer.svelte";
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
    <meta property="og:image" content={data.previewImage.path} />
    <meta property="og:image:secure_url" content={data.previewImage.path} />
    <meta property="og:image:alt" content={data.previewImage.alt} />
  {/if}
  <meta property="og:description" content={data.description} />
  <meta property="og:site_name" content="Byron Sharman" />

  {#if data.requiresHighlight}
    <link rel="stylesheet" href={syntaxHighlighting} />
  {/if}

  {@html `<script type="application/ld+json">${data.ldjson}</script>`}
</svelte:head>

<div class="p-std">
  <main class="max-w-(--content-width) mx-auto">
    <BackToHome />

    <article class="prose dark:prose-invert max-w-none text-[17px] mb-lg lg:mb-12">
      <hgroup class="mt-std lg:mt-lg">
        <h1 class="mb-sm! text-pretty lg:text-balance">{data.title}</h1>
        <DateP unixtime={data.date} />
      </hgroup>
      {@html data.html}
    </article>
  </main>
</div>

<div class="p-std pt-0 bg-neutral-50 dark:bg-neutral-800">
  <section class="max-w-[1280px] mx-auto">
    <h2 class="py-lg lg:py-12 font-semibold text-3xl text-fg-primary dark:text-fg-primary-dark">Recent Posts</h2>
    <BlogGrid blogs={data.recentBlogs} />
    <AllPosts />
  </section>
</div>

<footer class="py-3 bg-neutral-50 dark:bg-neutral-800">
  <Footer />
</footer>
