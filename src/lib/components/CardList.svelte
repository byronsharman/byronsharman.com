<script lang="ts">
import type { Snippet } from "svelte";

const { children }: { children: Snippet } = $props();
</script>

<section class="space-y-(--spc-std) lg:space-y-(--spc-lg) my-(--spc-std) lg:my-(--spc-lg)">
  {@render children()}
</section>
