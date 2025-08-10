<script lang='ts'>
import { onMount } from "svelte";

import BlogCard from "$lib/components/BlogCard.svelte";
import CardList from "$lib/components/CardList.svelte";
import type { PageProps } from "./$types";

import envelopeIcon from "$lib/assets/icons/envelope.svg";
import githubLogo from "$lib/assets/icons/github.svg";
import linkedinLogo from "$lib/assets/icons/linkedin.png";
import rssIcon from "$lib/assets/icons/rss.svg";
import portrait from "$lib/assets/portraits/portrait.avif";

type SocialLink = {
  iconSrc: string;
  iconAlt: string;
  targetUrl: string;
};

let emailAddress = $state("");
onMount(() => {
  emailAddress = atob("bWFpbHRvOmJ5cm9uLm4uc2hhcm1hbkBnbWFpbC5jb20=");
});

const socials: SocialLink[] = $derived([
  {
    iconSrc: envelopeIcon,
    iconAlt: "email",
    targetUrl: emailAddress,
  },
  {
    iconSrc: githubLogo,
    iconAlt: "GitHub",
    targetUrl: "https://github.com/byronsharman",
  },
  {
    iconSrc: linkedinLogo,
    iconAlt: "LinkedIn",
    targetUrl: "https://www.linkedin.com/in/byronsharman/",
  },
  {
    iconSrc: rssIcon,
    iconAlt: "RSS",
    targetUrl: "/blog.xml",
  },
]);

const { data }: PageProps = $props();
</script>

<svelte:head>
  <title>Byron Sharman</title>
  <meta name="description" content="Byron Sharman is a computer science student at the Colorado School of Mines. This is his portfolio and blog." />
</svelte:head>

<article class="my-8 lg:my-24">
  <div class="flex flex-col sm:flex-row-reverse gap-8 lg:gap-12">
    <img alt="portrait of my face with blurred plants in the background" src={portrait} class="size-36 rounded-full" />

    <div>
      <h1 class="font-bold text-4xl text-fg-primary dark:text-fg-primary-dark">Byron Sharman</h1>
      <p class="my-std lg:text-lg text-fg-secondary dark:text-fg-secondary-dark">
        I'm Byron, a computer science student at Colorado School of Mines. I
        like to make things, learn technologies, and explore the world,
        both physically and conceptually.
      </p>

      <ul class="my-std flex flex-row space-x-[20px]">
        {#each socials as social}
          <li>
            <a href={social.targetUrl}>
              <img alt={social.iconAlt} src={social.iconSrc} class="size-[20px] opacity-60 dark:invert" />
            </a>
          </li>
        {/each}
      </ul>

      <a href="/experience" class="block w-fit my-lg lg:my-std border-b text-fg-primary dark:text-fg-primary-dark group">
        See my experience
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4 inline motion-safe:transition motion-safe:group-hover:translate-x-0.5">
          <path fill-rule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clip-rule="evenodd" />
        </svg>
      </a>
    </div>
  </div>
</article>

<CardList>
  <h2 class="sr-only">Blog Posts</h2>
  {#each data.blogs as blog}
    <BlogCard blog={blog} />
  {/each}
</CardList>

<footer class="mb-std lg:mb-lg flex flex-row justify-between text-fg-tertiary dark:text-fg-tertiary-dark text-xs">
  <a aria-label="previous" href="https://grantlemons.com/webring/prev" class="flex flex-col justify-center">
    <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.205 8.72805L12.205 3.72805C13.2041 3.10363 14.5 3.82189 14.5 5.00004V15C14.5 16.1782 13.2041 16.8965 12.205 16.272L4.205 11.272C3.265 10.6845 3.265 9.31555 4.205 8.72805Z" />
    </svg>
  </a>
  <p class="mx-std">Come here from one of my friends' sites? Use these buttons to navigate the webring.</p>
  <a aria-label="next" href="https://grantlemons.com/webring/next" class="flex flex-col justify-center">
    <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.795 11.272L7.795 16.272C6.79593 16.8964 5.5 16.1782 5.5 15L5.5 5.00002C5.5 3.82186 6.79593 3.1036 7.795 3.72802L15.795 8.72802C16.735 9.31552 16.735 10.6845 15.795 11.272Z" />
    </svg>
  </a>
</footer>
