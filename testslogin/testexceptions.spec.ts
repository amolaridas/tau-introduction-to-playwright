import { test, expect } from "@playwright/test";

const URL = "https://practicetestautomation.com/practice-test-exceptions/";

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
});

test.describe("Test Exceptions`", () => {
  test("Case 1", async ({ page }) => {
    await page.goto(URL);
    await page.getByRole("button", { name: "Add" }).click();
    await expect(page.locator("#confirmation")).toContainText(
      "Row 2 was added"
    );
  });

  test("Case 2", async ({ page }) => {
    await page.goto(URL);
    await page.getByRole("button", { name: "Add" }).click();
    await page.getByRole("textbox").nth(1).click();
    await page.getByRole("textbox").nth(1).fill("test");
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("Row 2 was saved")).toBeVisible();
  });

  test("Case 3", async ({ page }) => {
    await page.goto(URL);
    await page.getByRole("button", { name: "Add" }).click();
    await page.getByRole("textbox").nth(1).click();
    await page.getByRole("textbox").nth(1).fill("test");
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByRole("textbox").nth(1)).toBeDisabled();
    await expect(page.getByRole("textbox").nth(1)).toHaveValue("test");
  });

  test("Case 4: copy value", async ({ page }) => {
    await page.goto(URL);
    const locator = page.getByRole("textbox");
    const textboxValue = await locator.inputValue();
    console.log(textboxValue);
    await page.getByRole("button", { name: "Add" }).click();
    await page.getByRole("textbox").nth(1).click();
    await page.getByRole("textbox").nth(1).fill(textboxValue);
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByRole("textbox").nth(1)).toBeDisabled();
    await expect(page.getByRole("textbox").nth(1)).toHaveValue("Pizza");
  });
});
