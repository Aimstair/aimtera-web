import { expect, test } from "@playwright/test";

test("Lume waitlist submit flow succeeds", async ({ page }) => {
  await page.route("**/functions/v1/get-waitlist-count", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        ok: true,
        message: "Waitlist count fetched",
        requestId: "test-count-1",
        product: "lume",
        count: 42,
      }),
    });
  });

  await page.route("**/functions/v1/submit-waitlist", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        ok: true,
        duplicate: false,
        message: "You are now on the waitlist.",
        requestId: "test-submit-1",
      }),
    });
  });

  await page.goto("/lume");

  await page.getByPlaceholder("Enter your email").first().fill("lume-e2e@example.com");
  await page.getByRole("button", { name: "Join Waitlist" }).first().click();

  await expect(page.getByText("You're on the list! We'll be in touch.").first()).toBeVisible();
});

test("SymmetryAI duplicate waitlist submit shows handled error", async ({ page }) => {
  await page.route("**/functions/v1/get-waitlist-count", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        ok: true,
        message: "Waitlist count fetched",
        requestId: "test-count-2",
        product: "symmetryai",
        count: 15,
      }),
    });
  });

  await page.route("**/functions/v1/submit-waitlist", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        ok: true,
        duplicate: true,
        message: "You are already on the waitlist.",
        requestId: "test-submit-2",
      }),
    });
  });

  await page.goto("/symmetryai");

  await page.getByPlaceholder("Enter your email").first().fill("symmetry-e2e@example.com");
  await page.getByRole("button", { name: "Join Waitlist" }).first().click();

  await expect(page.getByText("This email is already on the waitlist.")).toBeVisible();
});
