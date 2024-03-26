<script>
  // import '../../output.css';

  let words = "on the";
  let val = "";

  let start = null;
  let times = [];

  function checkVal() {
    if (val == "") {
      // reset timer when the user deletes all the text in the <input>
      start = null;
    }
    if (start === null) {
      start = Date.now();
    }
    if (val == words) {
      times = [Date.now() - start, ...times];
      start = null;
      val = "";
    }
  }
</script>

<p>Enter the words to type here:</p>
<input type="text" bind:value={words} on:input={() => {times = []; start = null}}/>

<p>Type it here:</p>
<input type="text" bind:value={val} on:input={checkVal}/>

{#if times.length}
  <table>
    {#each times as time}
      <tr class={time == Math.min(...times) ? "bg-green-200" : null}>
        {time + " ms (" + Math.round(words.length*12000/time) + " WPM)"}
      </tr>
    {/each}
  </table>
{:else}
  <p>Start typing; your times will show up here!</p>
{/if}

<style>
  .bg-green-200 {
    background-color: rgb(187 247 208);
  }
</style>
