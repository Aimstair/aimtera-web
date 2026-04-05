import { expect, test } from "@playwright/test";

test("@smoke homepage renders and key sections are visible", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "We Build What's Next." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "What Drives Us" })).toBeVisible();
});

test("@smoke product deep links render", async ({ page }) => {
  await page.goto("/lume");
  await expect(page.getByRole("heading", { name: /Leave a Little/i })).toBeVisible();

  await page.goto("/symmetryai");
  await expect(page.getByRole("heading", { name: /Your Body,/i })).toBeVisible();

  await page.goto("/account-deletion");
  await expect(page.getByRole("heading", { name: "Account Deletion Request" })).toBeVisible();
});
