<script lang='ts'>
  //import type { PageData } from './$types';

  export let github_data;
  //export let data: PageData;
</script>

<li class="border hover:border-gray-400 rounded-xl my-4">
  <a href={github_data.html_url} class="block p-4 rounded-lg">
    <h3 class="font-bold text-xl mb-4">{github_data.name}</h3>
    <p>{github_data.description}</p>
    <p class="mt-2 text-sm text-gray-600">{Object.keys(github_data.languages).join(', ')}</p>
  </a>
</li>
