import type { PageServerLoad } from "./$types";

import { getExperience } from "$lib/server/getExperience";

export const load: PageServerLoad = async ({ fetch }) => {
  return { experiences: await getExperience(fetch) };
};
