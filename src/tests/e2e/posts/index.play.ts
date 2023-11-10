import { PostFactory } from '@/tests/factories/PostFactory';
import { resetDB } from '@/tests/utils';
import { expect, test } from '@playwright/test';

test.describe('Posts', () => {
  test('should see Posts on the index page', async ({ page }) => {
    await resetDB();
    const post = await PostFactory.create({ title: 'First Post' });
    await page.goto('/posts');
    await page.pause();
    expect(await page.innerText('h1')).toBe('Posts');
    expect(page.getByRole('heading', { name: post.title })).toBeTruthy();
  });
});
