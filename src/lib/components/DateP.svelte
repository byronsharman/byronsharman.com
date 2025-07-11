<script lang='ts'>
// Given a Unix timestamp, output a <p> containing a nicely formatted version
// thereof, accounting for timezones.

interface Props {
  unixtime: number;
}
let { unixtime }: Props = $props();

const tzOffset = new Date().getTimezoneOffset() * 60000;
const iso8601 = $derived(
  new Date(unixtime * 1000 - tzOffset).toISOString().slice(0, 10),
);
</script>

<p class="m-0! text-sm text-neutral-600 dark:text-neutral-400">
  <time datetime={iso8601}>{iso8601}</time>
</p>
