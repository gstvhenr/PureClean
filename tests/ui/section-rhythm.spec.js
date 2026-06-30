import { expect, test } from '@playwright/test';

const singleLineHeadings = [
  'Resultados que se veem na foto',
  'Serviços de limpeza na região de Lisboa',
  'O que nos distingue',
  'Dúvidas comuns sobre os nossos serviços',
];

function countTextLines(element) {
  const range = document.createRange();
  range.selectNodeContents(element);
  const lineTops = [...range.getClientRects()].map((rect) => Math.round(rect.top));
  return new Set(lineTops).size;
}

test.describe('ritmo editorial das secções', () => {
  test('deve manter os títulos principais numa linha quando existe espaço no desktop', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/');

    for (const text of singleLineHeadings) {
      const heading = page.getByRole('heading', { level: 2, name: text });
      await heading.scrollIntoViewIfNeeded();
      await expect(heading.locator('..')).toHaveClass(/is-revealed/);
      expect(await heading.evaluate(countTextLines), text).toBe(1);
    }
  });

  test('deve aplicar reveal aos headings e aos grupos principais das secções', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/');

    const sectionHeadings = page.locator('.section-heading');
    await expect(sectionHeadings).toHaveCount(5);
    for (const heading of await sectionHeadings.all()) {
      await expect(heading).toHaveClass(/reveal-on-scroll/);
    }

    const groups = [
      '.about__gallery',
      '.about__content',
      '.differentials__list',
      '.process-timeline',
      '.faq-list',
      '.cta-banner__inner',
    ];
    for (const selector of groups) {
      await expect(page.locator(selector)).toHaveClass(/reveal-on-scroll/);
    }
  });

  test('deve revelar heading e conteúdo da FAQ uma única vez ao entrar no viewport', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/');

    const heading = page.locator('#faq .section-heading');
    const list = page.locator('#faq .faq-list');
    await expect(heading).not.toHaveClass(/is-revealed/);
    await expect(list).not.toHaveClass(/is-revealed/);
    await expect(heading).toHaveCSS('opacity', '0');

    await heading.scrollIntoViewIfNeeded();

    await expect(heading).toHaveClass(/is-revealed/);
    await expect(list).toHaveClass(/is-revealed/);
    await expect(heading).toHaveCSS('opacity', '1');
    await expect(heading).toHaveCSS('transform', 'none');
  });

  test('deve manter todas as novas transições visíveis em reduced motion', async ({
    browser,
  }) => {
    const context = await browser.newContext({
      reducedMotion: 'reduce',
      viewport: { width: 1440, height: 1000 },
    });
    const page = await context.newPage();
    await page.goto('/');

    const targets = page.locator(
      '.section-heading, .about__gallery, .about__content, .differentials__list, .process-timeline, .faq-list, .cta-banner__inner',
    );
    for (const target of await targets.all()) {
      await expect(target).toHaveCSS('opacity', '1');
      await expect(target).toHaveCSS('transform', 'none');
    }

    await context.close();
  });
});
