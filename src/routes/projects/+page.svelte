<script lang='ts'>
import BackToHome from "$lib/components/BackToHome.svelte";
import ProjectCard from "$lib/components/ProjectCard.svelte";
import type { PageProps } from "./$types";

let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>Projects | Byron Sharman</title>
  <meta name="description" content={`View ${data.projects.length} projects in Byron's project portfolio.`} />
</svelte:head>

<header class="hero-header">
  <h1>Projects</h1>
</header>

<div class="card-list">
  {#each data.projects as project}
    <ProjectCard {project} />
  {/each}
</div>

<BackToHome />
