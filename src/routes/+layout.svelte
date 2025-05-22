<script lang='ts'>
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

{@render children()}
