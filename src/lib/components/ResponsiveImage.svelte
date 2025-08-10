<script lang="ts">
import type { Picture } from "vite-imagetools";

interface Props {
  lazy: boolean;
  picture: Picture & { alt: string };
};

const { picture, lazy }: Props = $props();
</script>

<picture>
  {#each Object.entries(picture.sources) as [format, srcset]}
    <source
      srcset={srcset}
      type="image/{format}"
      sizes="
	(max-width: 700px) and (min-resolution: 3dppx) calc(33vw * 0.667),
	(max-width: 700px) 33vw"
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
