import * as zod from "zod";

export const Blog = zod.strictObject({
  title: zod.string().nonempty(),
  published: zod.boolean(),
  date: zod.number().nonnegative(),
  description: zod.string().nonempty(),
  image: zod
    .strictObject({
      alt: zod.string().nonempty(),
      name: zod.string().nonempty(),
      ogExt: zod.string(),
      optimizedExt: zod.string(),
    })
    .optional(),
});
