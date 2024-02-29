<script lang='ts'>
  // Given a unix timestamp, output a <p> containing a nicely formatted version thereof.
  // Accounts for timezones.

  export let unixtime

  const tzOffset = new Date().getTimezoneOffset() * 60000;
</script>

<p class="mt-2 text-sm text-gray-600">{new Date(unixtime * 1000 - tzOffset).toISOString().slice(0,10)}</p>
