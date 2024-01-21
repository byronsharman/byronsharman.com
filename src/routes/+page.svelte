<script lang='ts'>
  import '../global.css';
  import Email from './email.svelte';
</script>

<div id="outermost-flex">
  <main>
    <h1>Byron Sharman</h1>
    <p>
      I'm Byron, a computer science student at Mines. Of course, I really like to
      write code, learn new technologies, and (sometimes) even un-break my Arch
      install.
    </p>
    <p>
      I am also obsessed with the musical compositions of this old Russian guy
      named Sergei Rachmaninoff. My favorite piece changes every week or so, but
      right now, it's the original 1926 version of his Piano Concerto No.&nbsp;4.
    </p>
    <ul>
      <li><Email /></li>
      <li><a href="https://github.com/b-sharman">GitHub</a></li>
      <li><a href="https://www.linkedin.com/in/byron-sharman/">LinkedIn</a></li>
    </ul>
  </main>
</div>
