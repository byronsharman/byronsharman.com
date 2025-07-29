<script lang='ts'>
import "../app.css";

import { page } from "$app/state";
import { PUBLIC_BASE_URL } from "$env/static/public";

const canonicalUrl = $derived(
  new URL(page.url.pathname, PUBLIC_BASE_URL).toString(),
);

let { children } = $props();
</script>

<svelte:head>
  <link rel="canonical" href={canonicalUrl} />
</svelte:head>

<header class="mb-std lg:mb-12">
  <div class="mx-std">
    <div class="flex justify-between max-w-(--content-width) mx-auto">
      <a href="/" class="py-std underline">Byron Sharman</a>
      <nav class="py-std">
        <ul class="flex gap-lg">
          <!-- TODO: make a portfolio page that includes all experience, not just projects -->
          <li><a href="/projects" class="underline">Projects</a></li>
          <li><a href="/blog" class="underline">Blog</a></li>
        </ul>
      </nav>
    </div>
  </div>
</header>

<!-- Note to future self: If you ever want to center main by making it a flex container, consider nesting it in a div. That way, it won't be considered a flex item and will collapse margins as expected. See https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_display/Block_formatting_context -->
<main class="flex flex-col items-center m-std lg:m-lg">
  {@render children()}
</main>
