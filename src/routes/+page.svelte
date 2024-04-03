<script lang='ts'>
  import '../output.css';
  import type { PageData } from './$types';
  import Email from './email.svelte';
  import GitHubCard from '../lib/github_card.svelte';
  import BlogCard from '../lib/blog_card.svelte';

  export let data: PageData;
</script>

<svelte:head>
  <title>Byron Sharman</title>
  <meta name="description" content="Byron Sharman's blog and website" />
</svelte:head>

<div class="flex justify-center p-4">
  <main class="max-w-prose">
    <header class="my-6 sm:my-24">
      <h1 class="font-bold text-4xl lg:text-5xl text-center">Byron Sharman</h1>
      <ul class="my-4 flex flex-row justify-center divide-x">
          <li class="px-4"><Email /></li>
          <li class="px-4"><a href="https://github.com/b-sharman">GitHub</a></li>
          <li class="px-4"><a href="https://www.linkedin.com/in/b-sharman/">LinkedIn</a></li>
      </ul>
    </header>

    <article class="my-6 prose lg:prose-xl">
      <p>
        I'm Byron, a computer science student at Mines. Of course, I really like to
        write code, learn new technologies, and (sometimes) even un-break my Arch
        install.
      </p>
      <p>
        I am also obsessed with the musical compositions of Sergei Rachmaninoff. Currently, my favorite piece is his <em>Symphony No.&nbsp;3</em>, op.&nbsp;44.
      </p>
    </article>

    <section class="my-6 sm:my-16">
      <h2 class="my-8 font-bold text-3xl lg:text-4xl">Projects</h2>
      <ul>
        {#each data.github_data as project}
          <GitHubCard project={project} />
        {/each}
      </ul>
    </section>

    <section class="my-6 sm:my-16">
      <div class="flex flex-row justify-between items-center">
        <h2 class="my-8 font-bold text-3xl lg:text-4xl">Blog Posts</h2>
        <a href="/blog.xml"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 mb-2"><path fill-rule="evenodd" d="M3.75 4.5a.75.75 0 0 1 .75-.75h.75c8.284 0 15 6.716 15 15v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75C18 11.708 12.292 6 5.25 6H4.5a.75.75 0 0 1-.75-.75V4.5Zm0 6.75a.75.75 0 0 1 .75-.75h.75a8.25 8.25 0 0 1 8.25 8.25v.75a.75.75 0 0 1-.75.75H12a.75.75 0 0 1-.75-.75v-.75a6 6 0 0 0-6-6H4.5a.75.75 0 0 1-.75-.75v-.75Zm0 7.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clip-rule="evenodd" /></svg></a>
      </div>
      <ul>
        {#each Object.values(data.blog_data) as blog}
          <BlogCard blog={blog} />
        {/each}
      </ul>
    </section>

    <div class="flex flex-row justify-between text-gray-500 text-xs">
      <a href="https://grantlemons.com/webring/prev" class="flex flex-col justify-center">
        <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.205 8.72805L12.205 3.72805C13.2041 3.10363 14.5 3.82189 14.5 5.00004V15C14.5 16.1782 13.2041 16.8965 12.205 16.272L4.205 11.272C3.265 10.6845 3.265 9.31555 4.205 8.72805Z" />
        </svg>
      </a>
      <p class="mx-8">Come here from one of my friends' sites? Use these buttons to navigate the webring.</p>
      <a href="https://grantlemons.com/webring/next" class="flex flex-col justify-center">
        <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.795 11.272L7.795 16.272C6.79593 16.8964 5.5 16.1782 5.5 15L5.5 5.00002C5.5 3.82186 6.79593 3.1036 7.795 3.72802L15.795 8.72802C16.735 9.31552 16.735 10.6845 15.795 11.272Z" />
        </svg>
      </a>
    </div>

  </main>
</div>
