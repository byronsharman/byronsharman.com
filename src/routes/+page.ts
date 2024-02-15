import type { PageLoad } from './$types';

// const projects=['b-sharman.github.io', 'aoc2023', 'bangbang'];
// simplify by only doing one project for now
const projects='b-sharman.github.io';

export const load: PageLoad = async ({ fetch, params }) => {
  const res = await fetch(`https://api.github.com/repos/b-sharman/${projects}`);
  let item = await res.json();

  const lang_res = await fetch(item.languages_url);
  item.languages = await lang_res.json();

  if (res.ok) {
    return { 'projects': projects, 'github_data': item };
  } else {
    throw new Error(item);
  }

};

