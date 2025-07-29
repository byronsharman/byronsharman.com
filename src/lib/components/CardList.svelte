<script lang="ts">
import type { Snippet } from "svelte";

const { children }: { children: Snippet } = $props();
</script>

<section class="w-(--content-width) max-w-full space-y-std lg:space-y-lg my-std lg:my-lg">
  {@render children()}
</section>
