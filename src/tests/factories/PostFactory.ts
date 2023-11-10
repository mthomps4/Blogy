import { prisma } from '@/services/prisma';
import { Post, Prisma } from '@prisma/client';
import { Chance } from 'chance';

const chance = new Chance();

const defaultSelect: Prisma.PostSelect = {
  id: true,
  title: true,
  content: true,
  published: true,
};

export const PostFactory = {
  build: (
    data: Partial<Prisma.PostCreateArgs['data']> = {},
    select: Partial<Prisma.PostCreateArgs['select']> = defaultSelect,
  ): Prisma.PostCreateArgs => {
    return {
      select,
      data: {
        title: chance.sentence(),
        content: chance.paragraph(),
        published: true,
        ...data,
      },
    };
  },
  create: async (
    data: Partial<Prisma.PostCreateArgs['data']> = {},
    select?: Partial<Prisma.PostCreateArgs['select']>,
  ): Promise<Post> => {
    const addressArgs = PostFactory.build(data, select);

    const post = await prisma.post.create(addressArgs);
    return post;
  },
};
