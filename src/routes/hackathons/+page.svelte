<script lang='ts'>
  import '../../output.css';
  import type { PageData } from './$types';
  import ProjectCard from '$lib/project_card.svelte';

  export let data: PageData;
</script>

<svelte:head>
  <title>Hackathons</title>
  <meta name="description" content="Hackathons I've been to and written blog posts about." />
</svelte:head>

<div class="flex justify-center p-4">
  <main class="max-w-prose w-[65ch]">

    <section>
      <h1 class="my-8 font-bold text-3xl lg:text-4xl">Hackathons</h1>

      <article class="my-6 prose lg:prose-lg">
        <p>
          A hackathon is a large weekend event where students gather (usually in teams of 1–4) to build and develop programming projects. Since there is generally a time limit anywhere from 24 to 48 hours, there's often lots of caffeine involved.
        </p>
        <p>
          Below are listed all the hackathons I've attended in reverse chronological order.
        </p>
      </article>

      <ul class="mt-12 my-6">
        {#each data.projects as project}
          <ProjectCard project={project} />
        {/each}
      </ul>
    </section>

  </main>
</div>
