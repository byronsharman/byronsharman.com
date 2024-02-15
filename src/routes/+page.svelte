<script lang='ts'>
  import '../output.css';
  import Email from './email.svelte';

  /* Eventually I want to grab these using the GitHub API */
  /* it seems like https://api.github.com/repos/b-sharman/b-sharman.github.io
   * should suffice for the simple functionality I require */
  const projects = [
    {
      'name': 'b-sharman.github.io',
      'url': 'https://github.com/b-sharman/b-sharman.github.io',
      'description': 'this website',
      'languages': {
        'CSS': 32782,
        'Svelte': 1291,
        'JavaScript': 1036,
        'HTML': 393,
        'TypeScript': 310,
      },
    },
    {
      'name': 'Advent of Code 2023',
      'url': 'https://github.com/b-sharman/aoc2023',
      'description': 'my solutions for Advent of Code 2023, mostly in C++',
      'languages': {
        'C++': 44034,
        'Python': 2636,
      },
    },
    {
      'name': 'bangbang',
      'url': 'https://github.com/b-sharman/bangbang',
      'description': 'a simple tank game made with Pygame, OpenGL, and websockets',
      'languages': {
          'Python': 86673,
      },
    },
  ];
</script>

<div class="flex justify-center p-4">
  <main class="max-w-prose">
    <header class="my-6 sm:my-24">
      <h1 class="font-bold text-4xl lg:text-5xl text-center">Byron Sharman</h1>
      <ul class="my-4 flex flex-row justify-center divide-x">
          <li class="px-4"><Email /></li>
          <li class="px-4"><a href="https://github.com/b-sharman">GitHub</a></li>
          <li class="px-4"><a href="https://www.linkedin.com/in/byron-sharman/">LinkedIn</a></li>
      </ul>
    </header>

    <article class="my-6 prose lg:prose-xl">
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

    <section class="my-6 sm:my-16">
      <h2 class="my-8 font-bold text-3xl lg:text-4xl">Projects</h2>
      <ul>
        {#each projects as p}
          <li class="border hover:border-gray-400 rounded-xl my-4">
            <a href={p.url} class="block p-4 rounded-lg">
              <h3 class="font-bold text-xl mb-4">{p.name}</h3>
              <p>{p.description}</p>
              <p class="mt-2 text-sm text-gray-600">{Object.keys(p.languages).join(', ')}</p>
            </a>
          </li>
        {/each}
      </ul>
    </section>

  </main>
</div>
