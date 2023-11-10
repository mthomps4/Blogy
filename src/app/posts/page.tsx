import type { Metadata } from 'next';

import { fetchPosts } from '@/server/posts';
import { Post } from '@prisma/client';

import Link from 'next/link';
import { PostCard } from './PostCard';

export const metadata: Metadata = {
  title: 'Posts Page',
  description: 'Our cool Posts page...',
};

export default async function PostsPage() {
  const posts: Post[] = await fetchPosts();

  return (
    <div>
      <h1 className="w-full text-center text-slate-800 text-6xl mb-10">
        Posts
      </h1>
      <div className="flex justify-end items-center my-4">
        <Link
          href="/posts/new"
          data-testid="create-post-link"
          className="underline text-blue-500"
        >
          + Create Post
        </Link>
      </div>
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-3 gap-20 max-w-6xl">
          {posts.map((post) => (
            <div
              className="col-span-1"
              key={post.id}
              data-testid={`post-card-${post.id}`}
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
