<script lang='ts'>
import BackToHome from "$lib/components/BackToHome.svelte";
import CardList from "$lib/components/CardList.svelte";
import Experience from "$lib/components/Experience.svelte";
import type { PageProps } from "./$types";

let { data }: PageProps = $props();

const descriptionTag = `Byron Sharman's experience. ${data.experiences.map(exp => `${exp.name}, ${exp.date.toLocaleDateString(undefined, { year: "numeric", month: "long" })}`).join("; ")}.`;
</script>

<svelte:head>
  <title>Experience</title>
  <meta name="description" content={descriptionTag} />
</svelte:head>

<BackToHome />

<header class="w-full max-w-(--content-width) my-std lg:my-lg">
  <h1 class="font-bold text-4xl text-fg-primary dark:text-fg-primary-dark">Experience</h1>
</header>

<CardList>
  {#each data.experiences as experience}
    <Experience {experience} />
  {/each}
</CardList>
