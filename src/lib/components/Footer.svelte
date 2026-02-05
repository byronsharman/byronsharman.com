<script lang='ts'>
let { classList = "mx-std" }: { classList: string} = $props();
</script>

<footer class={classList}>
  <div class="w-full max-w-(--content-width) mx-auto mb-4 flex flex-row justify-between text-center text-fg-tertiary dark:text-fg-tertiary-dark text-xs">
    <a aria-label="previous" href="https://grantlemons.com/webring/prev?Referer=byronsharman.com" class="flex flex-col justify-center">
      <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.205 8.72805L12.205 3.72805C13.2041 3.10363 14.5 3.82189 14.5 5.00004V15C14.5 16.1782 13.2041 16.8965 12.205 16.272L4.205 11.272C3.265 10.6845 3.265 9.31555 4.205 8.72805Z" />
      </svg>
    </a>
    <p class="mx-std">Come here from one of my friends' sites? Use these buttons to navigate the webring.</p>
    <a aria-label="next" href="https://grantlemons.com/webring/next?Referer=byronsharman.com" class="flex flex-col justify-center">
      <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.795 11.272L7.795 16.272C6.79593 16.8964 5.5 16.1782 5.5 15L5.5 5.00002C5.5 3.82186 6.79593 3.1036 7.795 3.72802L15.795 8.72802C16.735 9.31552 16.735 10.6845 15.795 11.272Z" />
      </svg>
    </a>
  </div>

  <p class="text-xs text-center text-neutral-500 dark:text-neutral-600">
    Copyright &copy; {new Date().getFullYear()} Byron Sharman. All rights reserved.
  </p>
</footer>

