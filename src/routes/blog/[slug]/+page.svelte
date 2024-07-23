<script lang='ts'>
  import '../../../output.css';
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
  <main class="min-w-0 max-w-prose">
    <article class="my-6 prose lg:prose-lg prose-img:mb-0 prose-img:w-max prose-img:object-scale-down sm:prose-img:max-h-96 md:prose-img:max-h-[34rem] prose-h1:mb-0 prose-code:whitespace-pre prose-code:font-normal prose-code:prose-strong:font-bold prose-code:before:content-none prose-code:after:content-none prose-code:bg-neutral-200 prose-code:p-1 prose-code:rounded prose-pre:bg-neutral-200 prose-pre:text-inherit prose-code:prose-pre:block">
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
