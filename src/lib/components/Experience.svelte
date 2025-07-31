<script lang='ts'>
import GenericCard from "$lib/components/GenericCard.svelte";
import type { Experience } from "$lib/types.ts";

let { experience }: { experience: Experience } = $props();
</script>

<GenericCard minWidth href={experience.url}>
  {#if experience.image !== undefined}
    <img
      alt={experience.image.alt}
      class="object-contain max-h-60 mb-std sm:float-right sm:max-w-72 sm:ml-std aspect-[{experience.image.width/experience.image.height}]"
      loading="lazy"
      src={experience.image.path}
    />
  {/if}
  <h2 class="card-heading">
    {experience.name}
    {#if "parenthetical" in experience}
      <span class="font-normal text-fg-secondary dark:text-fg-secondary-dark">{`(${experience.parenthetical})`}</span>
    {/if}
  </h2>
  <p class="text-sm text-fg-tertiary dark:text-fg-tertiary-dark mb-std">{experience.languages.join(', ')}</p>
  <div class="prose dark:prose-invert text-base/6 max-w-max">{@html experience.description}</div>
</GenericCard>
