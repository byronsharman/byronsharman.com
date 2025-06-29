<script lang='ts'>
import ProjectCard from "$lib/projectCard.svelte";
import type { PageProps } from "./$types";

let { data }: PageProps = $props();
</script>

<h1>Projects</h1>
<ul class="space-y-4">
  {#each data.projects as project}
    <ProjectCard {project} />
  {/each}
</ul>
