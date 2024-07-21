<script lang='ts'>
  import type { Project } from '../routes/+page.server.ts';
  export let project: Project;
</script>

<li class="border hover:border-gray-400 rounded-xl my-4">
  <a href={project.url} class="block p-4 rounded-lg">
    <h3 class="font-bold text-xl mb-2">{project.name}</h3>
    <p class="text-sm text-gray-600 mb-4">{project.category}</p>
    <p>{project.description}</p>
    <p class="mt-2 text-sm text-gray-600">{project.languages.join(', ')}</p>
    <p class="text-sm">{project.bottomText}</p>
  </a>
</li>
