<script lang='ts'>
import GenericCard from "$lib/components/GenericCard.svelte";
import type { Project } from "$lib/types.ts";

interface Props {
  project: Project;
}

let { project }: Props = $props();
</script>

<GenericCard minWidth href={project.url}>
  {#if project.image !== undefined}
    <img
      alt={project.image.alt}
      class="object-contain max-h-60 mb-std sm:float-right sm:max-w-72 sm:ml-std aspect-[{project.image.width/project.image.height}]"
      loading="lazy"
      src={project.image.path}
    />
  {/if}
  <h2 class="card-heading">
    {project.name}
    {#if project.hackathonName !== undefined}
      <span class="font-normal text-fg-secondary dark:text-fg-secondary-dark">{`[${project.hackathonName}]`}</span>
    {/if}
    {#if project.name === 'byronsharman.com'}
      <span class="font-normal text-fg-secondary dark:text-fg-secondary-dark">{`(this website!)`}</span>
    {/if}
  </h2>
  <p class="text-sm text-fg-tertiary dark:text-fg-tertiary-dark mb-std">{project.languages.join(', ')}</p>
  <div class="prose dark:prose-invert max-w-max">{@html project.description}</div>
</GenericCard>
