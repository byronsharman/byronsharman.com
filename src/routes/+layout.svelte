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

<main class="h-full max-w-(--breakpoint-md) p-(--spc-std) lg:p-(--spc-lg) mx-auto">
  {@render children()}
</main>
