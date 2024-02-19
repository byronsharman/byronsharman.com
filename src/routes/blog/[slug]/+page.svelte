<script lang='ts'>
  import '../../../output.css';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="flex justify-center p-4">
  <main class="max-w-prose">
    <article class="my-6 prose lg:prose-xl">
      {@html data.html}
    </article>
  </main>
</div>
