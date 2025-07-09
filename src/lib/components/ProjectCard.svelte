<script lang='ts'>
import type { Project } from "$lib/types.ts";

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
        class="object-contain max-h-60 mb-(--spc-std) sm:float-right sm:max-w-72 sm:ml-(--spc-std) aspect-[{project.image.width/project.image.height}]"
        loading="lazy"
        src={project.image.path}
      />
    {/if}
    <h2>
      {project.name}
      {#if project.hackathonName !== undefined}
        <span class="font-normal text-gray-800">{`[${project.hackathonName}]`}</span>
      {/if}
      {#if project.name === 'byronsharman.com'}
        <span class="font-normal text-gray-800">{`(this website!)`}</span>
      {/if}
    </h2>
    <p class="text-sm text-gray-600 mb-(--spc-std)">{project.languages.join(', ')}</p>
    <div class="prose max-w-max">{@html project.description}</div>
  </a>
</article>

<style>
@reference "../../app.css";

/* code needs to be a little darker when rendered on a non-white background */
/* note that this style is applied globally through the whole project, since scoped styling doesn't work with @html tags */
:global {
  .card .prose code {
    @apply bg-gray-300;
  }
}
</style>
