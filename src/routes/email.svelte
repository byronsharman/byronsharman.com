<script lang='ts'>
  import { onMount } from 'svelte';

  function decodeRot14(s: string): string {
    const regex = /[a-z]/;
    return s.split('')
      .map(
        (char) => {
          if (regex.test(char)) {
            return String.fromCharCode(char.charCodeAt(0) + (char < 'm' ? 14 : -12));
          }
          else { return char; }
        }
      )
      .join('');
  }

  let ea: string = '';
  onMount(() => {
    ea = decodeRot14(atob('bmtkYXouei5ldG1keW16QHN5bXV4Lm9heQ=='));
  });
</script>

<a href={`mailto:${ea}`}>{ea}</a>
