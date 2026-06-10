import { test, expect } from "@playwright/test";

const URL = "https://www.goindigo.in/";

test("IndiGo round-trip search inputs", async ({ page }) => {
  await page.goto(URL, { waitUntil: "domcontentloaded" });
  // Best-effort: cookie banners / one-time modals.
  for (const c of [
    page.getByRole("button", { name: /accept/i }),
    page.getByRole("button", { name: /agree/i }),
    page.getByRole("button", { name: /got it/i }),
    page.getByRole("button", { name: /^close$/i }),
    page.locator('[aria-label="Close"]'),
  ]) {
    if (await c.first().isVisible().catch(() => false)) {
      await c.first().click().catch(() => {});
    }
  }

  // Radio button: Round Trip
  const roundTrip = page.getByText(/round\s*trip/i, { exact: false }).first();
  await expect(roundTrip).toBeVisible({ timeout: 20_000 });
  await roundTrip.click({ timeout: 20_000 });

  // From: Hyderabad (HYD), To: Bengaluru (BLR)
  {
    let fromInput = page.getByPlaceholder(/from/i).first();
    if (!(await fromInput.isVisible().catch(() => false))) {
      fromInput = page.getByRole("textbox", { name: /from/i }).first();
    }
    await expect(fromInput).toBeVisible({ timeout: 20_000 });
    await fromInput.click({ timeout: 20_000 });
    await fromInput.fill("");
    await fromInput.type("Hyd", { delay: 50 });
    const fromOption = page.getByText(/Hyderabad.*HYD/i, { exact: false }).first();
    await expect(fromOption).toBeVisible({ timeout: 20_000 });
    await fromOption.click();
  }

  {
    let toInput = page.getByPlaceholder(/to/i).first();
    if (!(await toInput.isVisible().catch(() => false))) {
      toInput = page.getByRole("textbox", { name: /to/i }).first();
    }
    await expect(toInput).toBeVisible({ timeout: 20_000 });
    await toInput.click({ timeout: 20_000 });
    await toInput.fill("");
    await toInput.type("Ben", { delay: 50 });
    const toOption = page
      .getByText(/Bengaluru.*BLR|Bangalore.*BLR/i, { exact: false })
      .first();
    await expect(toOption).toBeVisible({ timeout: 20_000 });
    await toOption.click();
  }

  // Depature: 25-Apr-2026, Return: 30-Apr-2026
  {
    const dateCandidates = [
      page.getByRole("textbox", { name: /depart/i }).first(),
      page.getByRole("textbox", { name: /departure/i }).first(),
      page.getByRole("textbox", { name: /date/i }).first(),
      page.getByText(/departure/i).first(),
      page.getByText(/return/i).first(),
    ];
    for (const c of dateCandidates) {
      if (await c.isVisible().catch(() => false)) {
        await c.click({ timeout: 10_000 }).catch(() => {});
        break;
      }
    }

    const dateAriaRegex = (day, monthShort, year) => {
      const d = String(day).padStart(2, "0");
      return new RegExp(
        `(${d}|${day}).*${monthShort}.*${year}|${monthShort}.*(${d}|${day}).*${year}`,
        "i"
      );
    };

    const pickDate = async (day, monthShort, year) => {
      const targets = [
        page.getByRole("button", { name: dateAriaRegex(day, monthShort, year) }),
        page.locator("button").filter({ hasText: new RegExp(`^${day}$`) }).first(),
        page.getByText(new RegExp(`^${day}$`)).first(),
      ];
      for (const t of targets) {
        if (await t.isVisible().catch(() => false)) {
          await t.click();
          return;
        }
      }
      throw new Error(`Could not pick date ${day}-${monthShort}-${year}`);
    };

    await pickDate(25, "Apr", 2026);
    await pickDate(30, "Apr", 2026);
  }

  // Travellers + Special Fares
  {
    const openCandidates = [
      page.getByText(/travellers?/i, { exact: false }).first(),
      page.getByText(/passengers?/i, { exact: false }).first(),
      page.getByText(/special\s*fares/i, { exact: false }).first(),
    ];
    for (const c of openCandidates) {
      if (await c.isVisible().catch(() => false)) {
        await c.click().catch(() => {});
        break;
      }
    }

    const setCountByRowLabel = async (rowLabelRegex, desiredCount) => {
      const row = page.locator("div, li, tr").filter({ hasText: rowLabelRegex }).first();
      await expect(row).toBeVisible({ timeout: 20_000 });

      const plus = row.getByRole("button", { name: /\+/ }).first();
      const minus = row.getByRole("button", { name: /-/ }).first();
      const countText = row.locator("text=/\\b\\d+\\b/").first();

      const readCount = async () => {
        const txt = (await countText.textContent().catch(() => "")) || "";
        const m = txt.match(/\b(\d+)\b/);
        return m ? Number(m[1]) : NaN;
      };

      let current = await readCount();
      if (Number.isNaN(current)) current = 0;

      while (current > desiredCount) {
        await minus.click({ timeout: 5_000 }).catch(() => {});
        current -= 1;
      }
      while (current < desiredCount) {
        await plus.click({ timeout: 5_000 }).catch(() => {});
        current += 1;
      }
    };

    await setCountByRowLabel(/adult/i, 2);
    await setCountByRowLabel(/senior/i, 1);
    await setCountByRowLabel(/child/i, 1);
  }

  // Minimal sanity assertions (widget reflects stations somewhere).
  await expect(page.getByText(/HYD/i).first()).toBeVisible();
  await expect(page.getByText(/BLR/i).first()).toBeVisible();
});

