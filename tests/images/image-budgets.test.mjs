import assert from 'node:assert/strict';
import test from 'node:test';

import { checkImageBudgets } from '../../scripts/check-image-budgets.mjs';

test('deve manter todos os formatos modernos dentro dos budgets', async () => {
  const result = await checkImageBudgets();

  if (!result.ok) {
    throw new Error(result.errors.join('\n'));
  }

  const heroFiles = result.files.filter((file) =>
    file.filePath.includes('hero-service'),
  );
  heroFiles.forEach((file) => {
    assert.equal(file.id, 'about-service');
    assert.equal(file.budget, 200 * 1024);
  });
});
