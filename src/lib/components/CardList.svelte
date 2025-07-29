<script lang="ts">
import type { Snippet } from "svelte";

const { children }: { children: Snippet } = $props();
</script>

<section class="w-[650px] max-w-full space-y-std lg:space-y-lg my-std lg:my-lg">
  {@render children()}
</section>
