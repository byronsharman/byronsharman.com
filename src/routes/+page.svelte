<script lang='ts'>
  import '../output.css';
  import Email from './email.svelte';
</script>

<div class="flex justify-center p-4">
  <main class="max-w-prose">
    <header class="mt-6 mb-12 sm:my-24">
      <h1 class="font-bold text-4xl text-center">Byron Sharman</h1>
      <ul class="my-4 flex flex-row justify-center divide-x">
          <li class="px-4"><Email /></li>
          <li class="px-4"><a href="https://github.com/b-sharman">GitHub</a></li>
          <li class="px-4"><a href="https://www.linkedin.com/in/byron-sharman/">LinkedIn</a></li>
      </ul>
    </header>

    <article class="prose lg:prose-xl">
      <p>
        I'm Byron, a computer science student at Mines. Of course, I really like to
        write code, learn new technologies, and (sometimes) even un-break my Arch
        install.
      </p>
      <p>
        I am also obsessed with the musical compositions of this old Russian
        guy named Sergei Rachmaninoff. Currently, my favorite piece is his
        choral symphony <em>The Bells</em>, op.&nbsp;35.
      </p>
    </article>
  </main>
</div>
