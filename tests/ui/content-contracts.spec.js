import { expect, test } from '@playwright/test';

test('deve manter labels do footer alinhados ao menu principal', async ({ page }) => {
  await page.goto('/');

  const headerLabels = await page
    .locator('.site-header__nav-link')
    .allTextContents();
  const footerLabels = await page
    .locator('.site-footer__grid > div:nth-child(2) .site-footer__link')
    .allTextContents();

  expect(footerLabels).toEqual(headerLabels);
});

test('deve renderizar fotografias com picture, formatos modernos e dimensões', async ({
  page,
}) => {
  await page.goto('/');

  const frames = page.locator('.media-frame:has(img)');
  await expect(frames).toHaveCount(2);

  for (const frame of await frames.all()) {
    const picture = frame.locator('picture');
    await expect(picture).toHaveCount(1);
    await expect(picture).toHaveCSS('display', 'block');
    await expect(picture.locator('source[type="image/avif"]')).toHaveCount(1);
    await expect(picture.locator('source[type="image/webp"]')).toHaveCount(1);

    const image = picture.locator('img');
    const dimensions = await image.evaluate((element) => ({
      width: element.getAttribute('width'),
      height: element.getAttribute('height'),
    }));
    expect(Number(dimensions.width)).toBeGreaterThan(0);
    expect(Number(dimensions.height)).toBeGreaterThan(0);
  }
});

test('deve renderizar vídeo do hero em loop muted sem controlos', async ({
  page,
}) => {
  await page.goto('/');

  const video = page.locator('.hero__visual video.media-frame__video--hero');
  await expect(video).toHaveCount(1);
  await expect(video).toHaveAttribute('muted', '');
  await expect(video).toHaveAttribute('loop', '');
  await expect(video).not.toHaveAttribute('controls', '');
  await expect(video).toHaveAttribute('playsinline', '');
});
