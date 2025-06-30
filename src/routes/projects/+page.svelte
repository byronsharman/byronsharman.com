<script lang='ts'>
import ProjectCard from "$lib/projectCard.svelte";
import type { PageProps } from "./$types";

let { data }: PageProps = $props();
</script>

<!-- TODO: add a svelte:head with a title -->

<header class="hero-header">
  <h1>Projects</h1>
</header>

<ul class="card-list">
  {#each data.projects as project}
    <ProjectCard {project} />
  {/each}
</ul>
