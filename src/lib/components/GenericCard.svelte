<script lang="ts">
import type { Snippet } from "svelte";

interface Props {
  minWidth: boolean;
  href: string;
  children: Snippet;
}

const { minWidth = false, href, children }: Props = $props();
</script>

<article class={minWidth ? "card sm:min-w-[250px]" : "card"}>
  <a {href} class="block p-6 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
    {@render children()}
  </a>
</article>
