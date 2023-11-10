import { CreatePostSchema, SerializedPost } from '@/types/posts';
import { prisma } from './prisma';
import { Post, User } from '@prisma/client';

export const fetchPosts = async () => {
  return prisma.post.findMany({});
};

export const createPost = async (
  input: CreatePostSchema,
): Promise<SerializedPost> => {
  try {
    const post = await prisma.post.create({
      data: input,
    });

    return serialize(post);
  } catch (e) {
    throw e;
  }
};

const serialize = (post: Post, user?: User): SerializedPost => {
  const isAdmin = user?.isAdmin || false;
  // const isOwner = post.autherId === user?.id;

  const adminFields = isAdmin ? { published: post.published } : {};

  return {
    ...post,
    ...adminFields,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  };
};
