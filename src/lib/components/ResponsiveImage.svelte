<script lang="ts">
import type { Picture } from "vite-imagetools";

interface Props {
  lazy: boolean;
  picture: Picture & { alt: string };
};

const { picture, lazy }: Props = $props();
</script>

<picture>
  {#each Object.entries(picture.sources) as [srcset, format]}
    <source
      srcset={srcset}
      type="image/{format}"
      sizes="
	(max-width: 700px) and (min-resolution: 3dppx) 66vw,
	(max-width: 700px) 100vw,
	min(700px, {picture.img.w}px)"
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
