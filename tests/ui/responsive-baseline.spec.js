import { expect, test } from '@playwright/test';

test.describe('baseline responsivo', () => {
  test('deve manter padding horizontal simétrico nos contentores em mobile', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const padding = await page.locator('#sobre .pc-container').evaluate((element) => {
      const styles = getComputedStyle(element);
      return {
        left: Number.parseFloat(styles.paddingLeft),
        right: Number.parseFloat(styles.paddingRight),
      };
    });

    expect(padding.right).toBe(padding.left);
  });

  test('deve manter todo o header dentro do viewport em 768px', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 900 });
    await page.goto('/');

    const headerBounds = await page.locator('.site-header__inner').evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      const descendants = [...element.querySelectorAll('*')];
      return descendants.reduce(
        (result, descendant) => {
          const rect = descendant.getBoundingClientRect();
          return {
            left: Math.min(result.left, rect.left),
            right: Math.max(result.right, rect.right),
          };
        },
        { left: bounds.left, right: bounds.right },
      );
    });

    expect(headerBounds.left).toBeGreaterThanOrEqual(0);
    expect(headerBounds.right).toBeLessThanOrEqual(768);
    await expect(page.locator('#mobile-menu-button')).toBeVisible();
    await expect(page.locator('.site-header__nav')).toBeHidden();
  });
});
