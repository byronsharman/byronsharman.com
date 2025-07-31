import * as zod from "zod";

const common = {
  date: zod.instanceof(Date).optional(),
  image: zod.optional(
    zod.object({
      alt: zod.string().nonempty(),
      path: zod.string().nonempty(),
    }),
  ),
  parenthetical: zod.string().optional(),
  published: zod.optional(zod.boolean()),
};

const notGitHub = {
  languages: zod.array(zod.string().nonempty()),
  name: zod.string(),
};

const nolink = {
  date: zod.instanceof(Date),
};

export const ExperienceSchema = zod.discriminatedUnion("type", [
  zod.strictObject({
    ...common,
    type: zod.literal("github"),
  }),
  zod.strictObject({
    ...common,
    ...notGitHub,
    type: zod.literal("blog"),
  }),
  zod.strictObject({
    ...common,
    ...notGitHub,
    ...nolink,
    type: zod.literal("nolink"),
  }),
]);
