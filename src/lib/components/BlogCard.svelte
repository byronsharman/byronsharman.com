<script lang='ts'>
import DateP from "$lib/components/DateP.svelte";
import GenericCard from "$lib/components/GenericCard.svelte";
import type { BlogCardData } from "$lib/types";

interface Props {
  blog: BlogCardData;
}

let { blog }: Props = $props();
</script>

<GenericCard href={blog.url}>
  <h3 class="card-heading text-pretty">{blog.title}</h3>
  <p class="grow mb-(--spc-sm) line-clamp-3 text-fg-secondary dark:text-fg-secondary-dark">{blog.preview}</p>
  <DateP unixtime={blog.date} />
</GenericCard>
