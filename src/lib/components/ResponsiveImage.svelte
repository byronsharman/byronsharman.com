<script lang="ts">
import type { Picture } from "vite-imagetools";

interface Props {
  lazy: boolean;
  picture: Picture & { alt: string };
  sizes: string;
};

const { picture, lazy, sizes }: Props = $props();
</script>

<picture>
  {#each Object.entries(picture.sources) as [format, srcset]}
    <source
      srcset={srcset}
      type="image/{format}"
      {sizes}
    />
  {/each}
  <img
    src={picture.img.src}
    alt={picture.alt}
    width={picture.img.w}
    height={picture.img.h}
    loading={lazy ? "lazy" : null}
    fetchpriority={lazy ? null : "high"}
  />
</picture>
