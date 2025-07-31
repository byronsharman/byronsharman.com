<script lang='ts'>
import BackToHome from "$lib/components/BackToHome.svelte";
import CardList from "$lib/components/CardList.svelte";
import ProjectCard from "$lib/components/ProjectCard.svelte";
import type { PageProps } from "./$types";

let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>Experience</title>
  <meta name="description" content={`View ${data.projects.length} projects in Byron's project portfolio.`} />
</svelte:head>

<BackToHome />

<header class="w-full max-w-(--content-width) my-std lg:my-lg">
  <h1 class="font-bold text-4xl text-fg-primary dark:text-fg-primary-dark">Experience</h1>
</header>

<CardList>
  {#each data.projects as project}
    <ProjectCard {project} />
  {/each}
</CardList>
