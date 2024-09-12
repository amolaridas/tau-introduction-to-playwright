import { test, expect } from "@playwright/test";

const URL = "https://practicetestautomation.com/practice-test-login/";

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
});

test.describe("Test Login Website`", () => {
  test("has title", async ({ page }) => {
    await page.goto(URL);
    await expect(page).toHaveTitle("Test Login | Practice Test Automation");
    await expect(page.locator("h2")).toContainText("Test login");
  });

  test("Positive Login", async ({ page }) => {
    await page.goto(URL);
    await page.getByLabel("Username").fill(process.env.name!);
    await page.getByLabel("Password").fill(process.env.password!);
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page).toHaveURL(/.*logged-in-successfully/);
    await expect(
      page.getByRole("heading", { name: "Logged In Successfully" })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Log out" })).toBeVisible();
  });

  test("Negative Username test", async ({ page }) => {
    await page.goto(URL);
    await page.getByLabel("Username").fill("incorrectUser");
    await page.getByLabel("Password").fill(process.env.password!);
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page.locator("#error")).toBeVisible();
    await expect(page.locator("#error")).toContainText(
      "Your username is invalid!"
    );
  });

  test("Negative Password test", async ({ page }) => {
    await page.goto(URL);
    await page.getByLabel("Username").fill(process.env.name!);
    await page.getByLabel("Password").fill(process.env.incorrectpass!);
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page.locator("#error")).toBeVisible();
    await expect(page.locator("#error")).toContainText(
      "Your password is invalid!"
    );
  });
});
