import { fetchPosts } from '@/server/posts';
import { prisma } from '@/services/prisma';
import { resetDB } from '@/tests/utils';

beforeAll(async () => {
  await prisma.post.createMany({
    data: [
      { title: 'Blog 1', published: true, content: 'Boom!' },
      { title: 'Blog 2' },
      { title: 'Blog 3' },
    ],
  });
});

afterAll(async () => {
  await resetDB();
});

describe('fetchPosts', () => {
  it('can fetch posts successfully', async () => {
    const posts = await fetchPosts();
    expect(posts.length).toEqual(3);
    expect(posts[0]).toEqual(
      expect.objectContaining({
        title: 'Blog 1',
        published: true,
        content: 'Boom!',
      }),
    );
  });
});
