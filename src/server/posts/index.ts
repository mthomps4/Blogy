'use server';

import { CreatePostResponse, CreatePostSchema } from '@/types/posts';
import * as PostService from '@/services/posts';
import { buildErrorResponse } from '@/utils';

export const fetchPosts = async () => {
  const _otherLogic = true;
  return PostService.fetchPosts();
};

export const createPost = async (
  input: CreatePostSchema,
): Promise<CreatePostResponse> => {
  try {
    const newPost = await PostService.createPost(input);

    // Additional Business Logic goes here...
    // e.g. metrics, logging, send notification, etc.

    return { data: newPost, error: undefined };
  } catch (error: unknown) {
    return { error: buildErrorResponse(error), data: undefined };
  }
};
