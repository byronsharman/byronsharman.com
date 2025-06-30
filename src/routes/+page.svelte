<script lang='ts'>
import BlogCard from "$lib/blogCard.svelte";
import Email from "$lib/email.svelte";
import type { PageProps } from "./$types";

// assets
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

const socials: SocialLink[] = [
  {
    iconSrc: envelopeIcon,
    iconAlt: "envelope icon",
    targetUrl: "mailto:byron.n.sharman@gmail.com",
  },
  {
    iconSrc: githubLogo,
    iconAlt: "GitHub logo",
    targetUrl: "https://github.com/byronsharman",
  },
  {
    iconSrc: linkedinLogo,
    iconAlt: "LinkedIn logo",
    targetUrl: "https://www.linkedin.com/in/byronsharman/",
  },
  {
    iconSrc: rssIcon,
    iconAlt: "RSS icon",
    targetUrl: "/blog.xml",
  },
]

let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>Byron Sharman</title>
  <meta name="description" content="I'm Byron, a computer science student at Colorado School of Mines. I love to write code and learn new technologies. Here, you can browse some of my projects or read my blog posts." />
</svelte:head>

<header class="hero-header">
  <div class="flex flex-row items-center h-24 my-4 lg:my-8 gap-4 lg:gap-6">
    <img alt="portrait of my face with blurred plants in the background" src={portrait} class="h-full rounded-full" />
    <div>
      <h1>Byron Sharman</h1>
      <ul class="mt-2 lg:mt-4 flex flex-row space-x-2 pointer-coarse:space-x-4">
        {#each socials as social}
          <li>
            <a href={social.targetUrl}>
              <img alt={social.iconAlt} src={social.iconSrc} class="size-5 pointer-coarse:size-6" />
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </div>

  <p class="my-4 max-w-xl text-gray-800">
    I'm Byron, a computer science student at Colorado School of Mines. I
    like to make things, learn technologies, and explore the world,
    both physically and conceptually.
  </p>

  <a href="/projects" class="my-4 lg:my-8 underline">
    Explore my projects
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4 inline">
      <path fill-rule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clip-rule="evenodd" />
    </svg>
  </a>
</header>

<section class="card-list my-(--spc-std) lg:my-(--spc-lg)">
  <h2 class="sr-only">Blog Posts</h2>
  {#each data.blogs as blog}
    <BlogCard blog={blog} />
  {/each}
</section>

<footer class="flex flex-row justify-between mt-8 lg:mt-16 text-gray-600 text-xs">
  <a aria-label="previous" href="https://grantlemons.com/webring/prev" class="flex flex-col justify-center">
    <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.205 8.72805L12.205 3.72805C13.2041 3.10363 14.5 3.82189 14.5 5.00004V15C14.5 16.1782 13.2041 16.8965 12.205 16.272L4.205 11.272C3.265 10.6845 3.265 9.31555 4.205 8.72805Z" />
    </svg>
  </a>
  <p class="mx-4">Come here from one of my friends' sites? Use these buttons to navigate the webring.</p>
  <a aria-label="next" href="https://grantlemons.com/webring/next" class="flex flex-col justify-center">
    <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.795 11.272L7.795 16.272C6.79593 16.8964 5.5 16.1782 5.5 15L5.5 5.00002C5.5 3.82186 6.79593 3.1036 7.795 3.72802L15.795 8.72802C16.735 9.31552 16.735 10.6845 15.795 11.272Z" />
    </svg>
  </a>
</footer>
