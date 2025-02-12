<script lang='ts'>
  import 'highlight.js/styles/base16/papercolor-light.css';

  import { marked } from 'marked';

  import type { PageData } from './$types';
  import DateP from '$lib/datep.svelte';
  import BlogCard from '$lib/blogCard.svelte';
  import BackToHome from '$lib/backToHome.svelte';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
</script>

<svelte:head>
  <title>{`${data.title} - Byron Sharman's blog`}</title>
  <meta name="description" content={data.preview} />

  <meta property="og:title" content={data.title} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={data.url} />
  {#if data.previewImage}
    <meta property="og:image" content={data.openGraphImageUrl} />
    <meta property="og:image:secure_url" content={data.openGraphImageUrl} />
    <meta property="og:image:alt" content={data.previewImageAlt} />
  {/if}
  <meta property="og:description" content={data.preview} />
  <meta property="og:site_name" content="Byron Sharman's blog" />

  {@html `<script type="application/ld+json">${data.ldjson}</script>`}
</svelte:head>

<div class="flex justify-center p-4">
  <main class="size-full max-w-[1240px] min-w-0 flex flex-col items-center">
    <article class="w-full mt-4 prose text-[17px]">
      <header class="mb-6">
        <h1 class="mb-2! text-pretty">{data.title}</h1>
        <DateP unixtime={data.date} />
        {#if data.customHeaderMD}
          <small class="block">
            {@html marked(data.customHeaderMD)}
          </small>
        {/if}
      </header>
      {@html data.html}
    </article>

    <hr class="size-full border-gray-300 my-10"/>

    <h2 class="w-full mt-4 heading2">Recent Posts</h2>
    <ul class="grid grid-flow-row grid-cols-1 md:grid-cols-2 w-full gap-4">
      {#each Object.values(data.recentBlogs) as blog}
        <BlogCard blog={blog} />
      {/each}
    </ul>

    <BackToHome />

  </main>
</div>
