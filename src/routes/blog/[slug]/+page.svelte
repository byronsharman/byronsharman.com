<script lang='ts'>
  import '../../../output.css';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="flex justify-center p-4">
  <main class="max-w-prose">
    <article class="my-6 prose lg:prose-lg prose-img:mb-0 prose-code:font-normal prose-code:before:content-none prose-code:after:content-none">
      {@html data.html}
    </article>
  </main>
</div>
