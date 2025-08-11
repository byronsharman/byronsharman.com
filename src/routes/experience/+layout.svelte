<script lang="ts">
import type { LayoutProps } from "./$types";

let { children }: LayoutProps = $props();
</script>

<div class="mx-std">
  <div class="items-center max-w-(--content-width) mx-auto my-std">
    {@render children()}
  </div>
</div>
