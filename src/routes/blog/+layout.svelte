<script lang="ts">
import type { LayoutProps } from "./$types";

let { children }: LayoutProps = $props();
</script>

<div class="min-h-screen bg-neutral-50 dark:bg-neutral-800">
  <div class="p-std">
    <div class="max-w-[1280px] mx-auto">
      {@render children()}
    </div>
  </div>
</div>
