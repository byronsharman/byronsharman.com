<script lang='ts'>
  export let project;
</script>

<li class="border hover:border-gray-400 rounded-xl my-4">
  <a href={project.html_url} class="block p-4 rounded-lg">
    <h3 class="font-bold text-xl mb-4">{project.name}</h3>
    <p>{project.description}</p>
    <p class="mt-2 text-sm text-gray-600">{Object.keys(project.languages).join(', ')}</p>
  </a>
</li>
