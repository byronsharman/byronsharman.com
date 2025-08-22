import { test, expect } from "@playwright/test";

test('correct meta name="description"', async ({ page }) => {
  // spot-test a particular blog
  await page.goto("/blog/nz0");

  await expect(page.locator('head > meta[name="description"]')).toHaveAttribute(
    "content",
    "A lifetime American ventures into the far South.",
  );
});

test("same blog not in recent posts", async ({ page }) => {
  await page.goto("/blog");

  // the first link will be the featured blog post
  const firstPost = page.getByRole("link").nth(1);
  const headingText = await firstPost.getByRole("heading").innerText();
  await firstPost.click();

  // this same blog post should not be in the recent posts
  await expect(
    page.getByRole("heading", { name: headingText, level: 3 }),
  ).toHaveCount(0);
});
