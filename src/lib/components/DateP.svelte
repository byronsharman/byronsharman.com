<script lang='ts'>
// Given a Unix timestamp, output a <p> containing a nicely formatted version
// thereof, accounting for timezones.

interface Props {
  unixtime: number;
  small?: boolean;
}
let { unixtime, small = false }: Props = $props();

const tzOffset = new Date().getTimezoneOffset() * 60000;
const date = new Date(unixtime * 1000 - tzOffset);
const iso8601 = $derived(
  new Intl.DateTimeFormat(undefined, { dateStyle: "long" }).format(date),
);
</script>

<p class={["m-0! text-fg-tertiary dark:text-fg-tertiary-dark", small && "text-sm"]}>
  <time datetime={iso8601}>{iso8601}</time>
</p>
