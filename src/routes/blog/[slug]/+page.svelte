<script lang='ts'>
  import 'highlight.js/styles/base16/papercolor-light.css';

  import type { PageData } from './$types';
  import DateP from '$lib/datep.svelte';

  export let data: PageData;
</script>

<svelte:head>
  <title>{`${data.title} - Byron Sharman's blog`}</title>
  <meta name="description" content={data.preview} />

  <meta property="og:title" content={data.title} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={data.url} />
  <meta property="og:image" content={data.openGraphImageUrl} />
  <meta property="og:image:secure_url" content={data.openGraphImageUrl} />
  <meta property="og:image:alt" content={data.previewImageAlt} />
  <meta property="og:description" content={data.preview} />
  <meta property="og:site_name" content="Byron Sharman's blog" />
</svelte:head>

<div class="flex justify-center p-4">
  <main class="min-w-0">
    <article class="my-6 prose text-[17px]">
      <header class="mb-8 lg:mb-12">
        <h1>{data.title}</h1>
        <DateP unixtime={data.date} />
        {#if data.customHeaderHTML}
          {@html data.customHeaderHTML}
        {/if}
      </header>
      {@html data.html}
      <a href="/" class="text-sm underline">Back to home</a>
    </article>
  </main>
</div>
