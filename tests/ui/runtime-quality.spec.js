import { expect, test } from '@playwright/test';

const viewports = [
  { width: 390, height: 844 },
  { width: 768, height: 900 },
  { width: 1024, height: 900 },
  { width: 1440, height: 1000 },
];

test.describe('qualidade de runtime', () => {
  for (const viewport of viewports) {
    test(`deve renderizar sem overflow, erros ou imagens quebradas em ${viewport.width}x${viewport.height}`, async ({
      browser,
    }) => {
      const context = await browser.newContext({ viewport });
      const page = await context.newPage();
      const consoleErrors = [];
      const failedRequests = [];

      page.on('console', (message) => {
        if (message.type() === 'error') consoleErrors.push(message.text());
      });
      page.on('requestfailed', (request) => {
        failedRequests.push(`${request.method()} ${request.url()}`);
      });

      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const layout = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        brokenImages: [...document.images]
          .filter((image) => {
            const src = image.currentSrc || image.src || '';
            if (src.includes('.svg')) return false;
            return !image.complete || image.naturalWidth === 0;
          })
          .map((image) => image.currentSrc || image.src),
        heroVideo: (() => {
          const video = document.querySelector('.hero__visual video');
          if (!video) return { missing: true };
          return {
            missing: false,
            networkState: video.networkState,
            readyState: video.readyState,
            src: video.currentSrc || video.getAttribute('src'),
          };
        })(),
      }));

      expect(layout.scrollWidth).toBe(layout.clientWidth);
      expect(layout.brokenImages).toEqual([]);
      expect(layout.heroVideo.missing).toBe(false);
      expect(layout.heroVideo.networkState).not.toBe(3);
      expect(layout.heroVideo.src).toContain('assets/video/hero.mp4');
      expect(consoleErrors).toEqual([]);
      expect(failedRequests).toEqual([]);

      await context.close();
    });
  }

  test('deve abrir e fechar o menu mobile mantendo aria-expanded sincronizado', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const button = page.locator('#mobile-menu-button');
    const menu = page.locator('#mobile-menu');
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await expect(menu).toBeHidden();

    await button.click();
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await expect(menu).toBeVisible();

    await menu.locator('a').first().click();
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await expect(menu).toBeHidden();
  });

  test('deve manter sticky e FAB mutuamente exclusivos e fora da tabulação quando ocultos', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const sticky = page.locator('pc-sticky-quote');
    const stickyLink = sticky.locator('a');
    const fab = page.locator('.whatsapp-fab');

    await expect(sticky).toHaveAttribute('inert', '');
    await expect(stickyLink).toHaveAttribute('tabindex', '-1');
    await expect(fab).not.toHaveAttribute('inert', '');

    await page.evaluate(() => window.scrollTo(0, 400));
    await expect(sticky).toHaveClass(/sticky-quote--visible/);
    await expect(sticky).not.toHaveAttribute('inert', '');
    await expect(stickyLink).not.toHaveAttribute('tabindex', '-1');
    await expect(fab).toHaveClass(/whatsapp-fab--scroll-hidden/);
    await expect(fab).toHaveAttribute('inert', '');
    await expect(fab).toHaveAttribute('tabindex', '-1');
  });

  test('deve apresentar foco de contraste duplo por navegação real com Tab', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    const focused = page.locator(':focus');
    await expect(focused).toHaveClass(/site-header__nav-link/);
    const styles = await focused.evaluate((element) => {
      const computed = getComputedStyle(element);
      return {
        outlineStyle: computed.outlineStyle,
        outlineWidth: computed.outlineWidth,
        boxShadow: computed.boxShadow,
      };
    });

    expect(styles.outlineStyle).toBe('solid');
    expect(Number.parseFloat(styles.outlineWidth)).toBeGreaterThanOrEqual(2);
    expect(styles.boxShadow).not.toBe('none');
  });

  test('deve limitar a sequência inicial da hero a menos de 480ms sem animar a fotografia', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/');

    const timings = await page.locator('.hero__motion-group').evaluateAll((groups) =>
      groups.map((group) => {
        const styles = getComputedStyle(group);
        return {
          duration: Number.parseFloat(styles.animationDuration) * 1000,
          delay: Number.parseFloat(styles.animationDelay) * 1000,
        };
      }),
    );
    const totalDuration = Math.max(
      ...timings.map(({ duration, delay }) => duration + delay),
    );

    expect(totalDuration).toBeLessThan(480);
    await expect(page.locator('.hero__visual')).toHaveCSS('animation-name', 'none');
  });

  test('deve manter CLS observado até 0,02', async ({ page }) => {
    await page.addInitScript(() => {
      window.__pureCleanCls = 0;
      new PerformanceObserver((entries) => {
        for (const entry of entries.getEntries()) {
          if (!entry.hadRecentInput) window.__pureCleanCls += entry.value;
        }
      }).observe({ type: 'layout-shift', buffered: true });
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 500)));

    const cls = await page.evaluate(() => window.__pureCleanCls);
    expect(cls).toBeLessThanOrEqual(0.02);
  });
});
