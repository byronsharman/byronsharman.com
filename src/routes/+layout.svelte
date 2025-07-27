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

<div style="display: contents">
  <!-- Note to future self: If you ever want to center main by making it a flex container, consider nesting it in a div. That way, it won't be considered a flex item and will collapse margins as expected. See https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_display/Block_formatting_context -->
  <div>
    <main class="flex flex-col items-center m-std lg:m-lg">
      {@render children()}
    </main>
  </div>
</div>
