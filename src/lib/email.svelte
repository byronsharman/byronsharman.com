<script lang='ts'>
  import { onMount } from 'svelte';

  let ea: string = $state('');
  onMount(() => {
    ea = atob('Ynlyb24ubi5zaGFybWFuQGdtYWlsLmNvbQ==');
  });
</script>

<a href={`mailto:${ea}`}>Email</a>
