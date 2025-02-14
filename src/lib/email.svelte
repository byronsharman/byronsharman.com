<script lang='ts'>
  import { onMount } from 'svelte';

  let ea: string = '';
  onMount(() => {
    ea = atob('bWFpbHRvOmJ5cm9uLm4uc2hhcm1hbkBnbWFpbC5jb20=');
  });
</script>

<a href={`${ea}`}>Email</a>
