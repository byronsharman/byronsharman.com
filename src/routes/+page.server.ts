import type { PageLoad } from './$types';
import { marked } from 'marked';
import { JSDOM } from 'jsdom';

import blogs from '/src/blog/index.json';

const projects = ['b-sharman.dev', 'aoc2023', 'bangbang'];

const fail_placeholder = {
  'html_url': '',
  'name': 'failed to load',
  'description': 'probably got rate limited by the GitHub API =/',
  'languages': {},
};

export const load: PageLoad = async (p) => {
  let retval = {};

  // GitHub API data
  await Promise.all(projects.map(
    async (pname) => {
      /* Note to future self:
       * If this breaks during a time of high traffic, it may be related to rate limiting:
       * https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api
       */
      const res = await p.fetch(`https://api.github.com/repos/b-sharman/${pname}`);
      if (!res.ok) {
        console.log('There was an error when fetching from the GitHub API');
        console.log('The response was:', res);
        return fail_placeholder;
      }
      let item = await res.json();

      const lang_res = await p.fetch(item.languages_url);
      if (!lang_res.ok) {
        console.log('There was an error when fetching from the GitHub API');
        console.log('The response was:', lang_res);
        return fail_placeholder;
      }
      item.languages = await lang_res.json();
      return item;
    }
  ))
    .then((values) => {
      retval.github_data = values;
    })
    .catch((e) => console.log('oopsy woopsy:', e));

  // blog data
  await Promise.all(Object.values(blogs).map(
    async (blog) => {
      const text = await p.fetch(`/src/blog/${blog['slug']}.md`)
        .then(res => res.text());
      const htmlString = marked(text);
      const doc = new JSDOM(htmlString).window.document;

      let ret = blog;
      ret.html = htmlString;
      ret.title = doc.getElementsByTagName('h1')[0].textContent;
      ret.preview = doc.getElementsByTagName('p')[0].textContent;
      return ret;
    }
  ))
    .then((values) => {
      retval.blog_data = values;
    })
    .catch((e) => console.log('oopsy woopsy:', e));

  return retval;
};

