<script lang='ts'>
  import hljs from 'highlight.js/lib/common';
  import 'highlight.js/styles/github.css';
  import { onMount } from 'svelte';

  import type { PageData } from './$types';
  import DateP from '$lib/datep.svelte';

  export let data: PageData;

  onMount(() => {
    hljs.highlightAll();
  });

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
    <!-- TODO: This massive wall of ugliness is due to the fact that I am
    trying to create my own theme for a single element. Most of this should
    eventually be moved to tailwind.config.js. -->
    <article class="my-6 prose text-[17px] prose-img:mb-0 prose-img:w-max prose-img:object-scale-down sm:prose-img:max-h-96 md:prose-img:max-h-[34rem] prose-h1:mb-0 prose-code:whitespace-pre prose-code:font-normal prose-code:prose-strong:font-bold prose-code:before:content-none prose-code:after:content-none prose-code:bg-neutral-200 prose-code:p-1 prose-code:rounded prose-pre:bg-neutral-200 prose-pre:text-inherit marker:text-gray-950">
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
