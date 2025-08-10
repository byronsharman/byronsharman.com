<script lang='ts'>
import type { Experience } from "$lib/types.ts";

function dateToStr(date: Date): string {
  return new Intl.DateTimeFormat(undefined, {
    month: "long",
    year: "numeric",
  }).format(date);
}

let { experience }: { experience: Experience } = $props();
const date = $derived(dateToStr(experience.date));
let startDate = $derived(
  experience.startDate === undefined
    ? undefined
    : dateToStr(experience.startDate),
);
const dateStr = $derived(
  startDate === undefined ? date : `${startDate} – ${date}`,
);
</script>

<article>
  <header class="flex flex-col sm:flex-row justify-between mb-2 sm:mb-0">
    <div class="flex flex-row divide-x divide-fg-tertiary dark:divide-fg-tertiary-dark">
      <h2 class="card-heading pe-std">
        {#if experience.type !== "blog" && experience.url !== undefined}
            <a href={experience.url} class="underline">{experience.name}</a>
        {:else}
          {experience.name}
        {/if}
      </h2>
      {#if experience.parenthetical !== undefined}
        <h3 class="ps-std text-lg text-fg-secondary dark:text-fg-secondary-dark">
          {#if experience.type === "blog" && experience.url !== undefined}
            <a href={experience.url} class="underline">{experience.parenthetical}</a>
          {:else}
            {experience.parenthetical}
          {/if}
        </h3>
      {/if}
    </div>
    <p class="text-base">{dateStr}</p>
  </header>
  <p class="text-sm text-fg-tertiary dark:text-fg-tertiary-dark mb-std">{experience.languages.join(', ')}</p>
  <div class="prose dark:prose-invert text-base/6 max-w-max">{@html experience.description}</div>
</article>
