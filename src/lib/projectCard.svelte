<script lang='ts'>
import type { Project } from "$lib/types.ts";
import { slide } from "svelte/transition";

interface Props {
  project: Project;
}

let { project }: Props = $props();
</script>

<article class="sm:min-w-[250px] card">
  <a href={project.url}>
    {#if project.image !== undefined}
      <img
        alt={project.image.alt}
        class="object-contain max-h-60 mb-4 sm:float-right sm:max-w-72 sm:ml-4 aspect-[{project.image.width/project.image.height}]"
        loading="lazy"
        src={project.image.path}
      />
    {/if}
    <h2 class="font-bold text-xl mb-2">
      {project.name}
      {#if project.hackathonName !== undefined}
        <span class="font-normal text-gray-600">{`[${project.hackathonName}]`}</span>
      {/if}
      {#if project.name === 'byronsharman.com'}
        <span class="font-normal text-gray-600">{`(this website!)`}</span>
      {/if}
    </h2>
    <p class="text-sm text-gray-600 mb-4">{project.languages.join(', ')}</p>
    <div class="prose max-w-max">{@html project.description}</div>
  </a>
</article>
