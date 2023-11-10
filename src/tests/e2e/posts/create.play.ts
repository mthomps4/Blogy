import { resetDB } from '@/tests/utils';
import { expect, test } from '@playwright/test';

test.describe('Create Posts', () => {
  test('should create a Post and see it on the index page', async ({
    page,
  }) => {
    await resetDB();
    await page.goto('/posts/new');
    expect(await page.innerText('h1')).toBe('Create Post');
    await page.fill('input[name="title"]', 'New Post');
    await page.fill('textarea[name="content"]', 'This is my new post');
    await page.click('button[type="submit"]');
    await page.waitForURL('/posts');
    expect(await page.innerText('h1')).toBe('Posts');
    expect(page.getByRole('heading', { name: 'New Post' })).toBeTruthy();
  });
});
