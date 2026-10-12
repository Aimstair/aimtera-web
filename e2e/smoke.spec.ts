import { expect, test } from "@playwright/test";

test("@smoke homepage renders and key sections are visible", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Hi, I'm Eric." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Where I've built things." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Things I've built." })).toBeVisible();
});

test("@smoke product deep links render", async ({ page }) => {
  await page.goto("/clipit");
  await expect(page.getByRole("heading", { name: "Never miss a highlight." })).toBeVisible();

  await page.goto("/maisoncarte");
  await expect(page.getByRole("heading", { name: "Greeting cards you open like a gift." })).toBeVisible();

  await page.goto("/clipit/privacy");
  await expect(page.getByRole("heading", { name: "Privacy Policy for Clip It" })).toBeVisible();

  await page.goto("/symmetryai");
  await expect(page.getByRole("heading", { name: /Your Body,/i })).toBeVisible();

  await page.goto("/account-deletion");
  await expect(page.getByRole("heading", { name: "Account Deletion Request" })).toBeVisible();
});
