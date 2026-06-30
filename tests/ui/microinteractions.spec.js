import { expect, test } from '@playwright/test';

test.describe('microinterações premium', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/');
  });

  test('deve revelar uma hairline no hover dos links de navegação', async ({
    page,
  }) => {
    const navLink = page.locator('.site-header__nav-link').first();
    const initial = await navLink.evaluate((element) => {
      const styles = getComputedStyle(element, '::after');
      return { content: styles.content, transform: styles.transform };
    });

    await navLink.hover();

    const hovered = await navLink.evaluate((element) => {
      const styles = getComputedStyle(element, '::after');
      return { content: styles.content, transform: styles.transform };
    });

    expect(initial.content).not.toBe('none');
    expect(hovered.transform).not.toBe(initial.transform);
  });

  test('deve rodar o marcador do FAQ sem animar a altura da resposta', async ({
    page,
  }) => {
    const item = page.locator('.faq-item').first();
    const summary = item.locator('.faq-item__question');
    const answer = item.locator('.faq-item__answer');
    const initialTransform = await summary.evaluate(
      (element) => getComputedStyle(element, '::after').transform,
    );

    await summary.click();

    const openTransform = await summary.evaluate(
      (element) => getComputedStyle(element, '::after').transform,
    );
    expect(openTransform).not.toBe(initialTransform);
    await expect(answer).toHaveCSS('transition-property', 'all');
    await expect(answer).toHaveCSS('transition-duration', '0s');
  });

  test('não deve ampliar fotografias da secção Sobre no hover', async ({
    page,
  }) => {
    const frame = page.locator('.media-frame--about').first();
    const image = frame.locator('.media-frame__img');

    await frame.hover();

    await expect(image).toHaveCSS('transform', 'none');
  });

  test('deve separar before/after e serviços com hairline neutra', async ({
    page,
  }) => {
    await expect(page.locator('.before-after-section')).toHaveCSS(
      'border-bottom-width',
      '1px',
    );
    await expect(page.locator('.before-after-section')).toHaveCSS(
      'border-bottom-style',
      'solid',
    );
  });
});
