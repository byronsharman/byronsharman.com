<script lang='ts'>
  import { marked } from 'marked';

  export let blog;

  const tzOffset = new Date().getTimezoneOffset() * 60000;
</script>

<li class="border hover:border-gray-400 rounded-xl my-4">
  <a href={`/blog/${blog.slug}`} class="block p-4 rounded-lg">
    <h3 class="font-bold text-xl mb-4">{blog.title}</h3>
    <p class="line-clamp-3">{blog.preview}</p>
    <p class="mt-2 text-sm text-gray-600">{new Date(blog.date * 1000 - tzOffset).toISOString().slice(0,10)}</p>
  </a>
</li>
