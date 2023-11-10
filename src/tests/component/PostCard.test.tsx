/**
 * @jest-environment jsdom
 */

import { PostCard } from '@/app/posts/PostCard';
import { prisma } from '@/services/prisma';
import { render, screen } from '@testing-library/react';
import { resetDB } from '../utils';

afterEach(async () => {
  await resetDB();
});

describe('<PostCard>', () => {
  it('can render given a Post', async () => {
    const post = await prisma.post.create({
      data: {
        title: 'Test Post',
        content: 'Test Content...',
      },
    });

    render(<PostCard post={post} />);
    expect(screen.getByRole('heading')).toHaveTextContent('Test Post');
  });
});
