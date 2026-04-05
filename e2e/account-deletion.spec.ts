import { expect, test } from "@playwright/test";

test("account deletion submission flow requests verification", async ({ page }) => {
  await page.route("**/functions/v1/submit-account-deletion", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        ok: true,
        message: "We received your request. Please verify from your email to continue.",
        requestId: "test-delete-1",
        deletionRequestId: "del-123",
      }),
    });
  });

  await page.goto("/account-deletion");

  await page.getByPlaceholder("The email associated with your account").fill("delete-me@example.com");
  await page.getByLabel("Lume").check();
  await page.getByRole("button", { name: "Submit Deletion Request" }).click();

  await expect(page.getByRole("heading", { name: "Request Submitted" })).toBeVisible();
});

test("account deletion verification link state is displayed", async ({ page }) => {
  await page.route("**/functions/v1/confirm-account-deletion", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        ok: true,
        message: "Your account deletion request has been verified.",
        requestId: "test-delete-2",
        deletionRequestId: "del-999",
        alreadyVerified: false,
      }),
    });
  });

  await page.goto("/account-deletion?verify=token-123");
  await expect(page.getByText("Your account deletion request has been verified.")).toBeVisible();
});
