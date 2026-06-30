import { expect, test } from '@playwright/test';

test.describe('acessibilidade e motion', () => {
  test('deve desativar scroll suave e revelar conteúdo com reduced motion', async ({
    browser,
  }) => {
    const context = await browser.newContext({
      reducedMotion: 'reduce',
      viewport: { width: 1440, height: 1000 },
    });
    const page = await context.newPage();
    await page.goto('/');

    await expect
      .poll(() =>
        page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior),
      )
      .toBe('auto');

    const motionTokens = await page.evaluate(() => {
      const styles = getComputedStyle(document.documentElement);
      return {
        legacy: styles.getPropertyValue('--transition').trim(),
        fast: styles.getPropertyValue('--motion-duration-fast').trim(),
        base: styles.getPropertyValue('--motion-duration-base').trim(),
        slow: styles.getPropertyValue('--motion-duration-slow').trim(),
      };
    });
    expect(motionTokens).toEqual({
      legacy: '',
      fast: '0ms',
      base: '0ms',
      slow: '0ms',
    });

    const reveal = page.locator('.reveal-on-scroll').first();
    await expect(reveal).toHaveCSS('opacity', '1');
    await expect(reveal).toHaveCSS('transform', 'none');

    await context.close();
  });

  test('deve manter hierarquia sem saltar de h2 para h4 nas secções', async ({
    page,
  }) => {
    await page.goto('/');

    await expect(page.locator('main h4')).toHaveCount(0);
  });

  test('deve aplicar foco visível consistente nos principais controlos', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/');

    const targets = [
      page.locator('.site-header__nav-link').first(),
      page.locator('.btn').first(),
      page.locator('.faq-item__question').first(),
      page.locator('.whatsapp-fab'),
    ];

    for (const target of targets) {
      await target.focus();
      const focusStyle = await target.evaluate((element) => {
        const styles = getComputedStyle(element);
        return {
          outlineStyle: styles.outlineStyle,
          outlineWidth: styles.outlineWidth,
          boxShadow: styles.boxShadow,
        };
      });

      expect(focusStyle.outlineStyle).toBe('solid');
      expect(Number.parseFloat(focusStyle.outlineWidth)).toBeGreaterThanOrEqual(2);
      expect(focusStyle.boxShadow).not.toBe('none');
    }
  });

  test('deve usar dois pontos de confiança em duas colunas no desktop', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/');

    await expect(page.locator('.hero__trust-item')).toHaveCount(2);
    const columns = await page.locator('.hero__trust').evaluate((element) =>
      getComputedStyle(element).gridTemplateColumns.split(' ').filter(Boolean),
    );
    expect(columns).toHaveLength(2);
  });

  test('deve manter a hero imediatamente visível em reduced motion', async ({
    browser,
  }) => {
    const context = await browser.newContext({
      reducedMotion: 'reduce',
      viewport: { width: 1440, height: 1000 },
    });
    const page = await context.newPage();
    await page.goto('/');

    await expect(page.locator('.hero__motion-group')).toHaveCount(3);
    for (const group of await page.locator('.hero__motion-group').all()) {
      await expect(group).toHaveCSS('opacity', '1');
      await expect(group).toHaveCSS('transform', 'none');
    }
    await expect(page.locator('.hero__visual')).toHaveCSS('animation-name', 'none');

    const heroVideo = page.locator('.hero__visual video');
    await expect(heroVideo).toHaveCount(1);
    await expect(heroVideo).toHaveJSProperty('paused', true);
    await expect(heroVideo).not.toHaveAttribute('autoplay');

    await context.close();
  });
});
