<script lang="ts">
import type { Snippet } from "svelte";

interface Props {
  minWidth: boolean;
  href: string;
  children: Snippet;
}

const { minWidth = false, href, children }: Props = $props();
</script>

<article class={minWidth ? "sm:min-w-[250px]" : undefined}>
  <a {href} class="block p-6 bg-gray-100 rounded-lg">
    {@render children()}
  </a>
</article>
