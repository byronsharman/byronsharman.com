import * as zod from "zod";

const common = {
  category: zod.literal(["personal", "school"]),
  image: zod.optional(
    zod.object({
      alt: zod.string(),
      path: zod.string(),
    }),
  ),
  published: zod.optional(zod.boolean()),
  type: zod.literal(["blog", "github"]),
};

const notGitHub = {
  languages: zod.array(zod.string()),
  name: zod.string(),
};

// lots of duplication here, but I'm new to Zod and this is simple!
export const project = zod.union([
  zod.strictObject({
    ...common,
    category: zod.literal("hackathon"),
    hackathonName: zod.string(),
    type: zod.literal("github"),
  }),
  zod.strictObject({
    ...common,
    ...notGitHub,
    category: zod.literal("hackathon"),
    hackathonName: zod.string(),
  }),
  zod.strictObject({
    ...common,
    type: zod.literal("github"),
  }),
  zod.strictObject({
    ...common,
    ...notGitHub,
  }),
]);
