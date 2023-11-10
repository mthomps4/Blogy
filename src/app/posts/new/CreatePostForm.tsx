/* eslint-disable no-console */
'use client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { createPost } from '@/server/posts';
import { CreatePostSchema, createPostSchema } from '@/types/posts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const CreatePostForm = () => {
  const [serverError, setServerError] = useState(false);
  const { toast } = useToast();

  const form = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const router = useRouter();

  const onSubmit = async (input: CreatePostSchema) => {
    const { data, error } = await createPost(input);

    if (error) {
      console.error(error);
      // TODO: top level error warning...
      setServerError(true);

      toast({
        title: 'Error creating post',
        description: 'Something went wrong',
        variant: 'destructive',
      });
    } else if (data) {
      toast({
        title: 'Success!',
        description: `${data.title} created successfully`,
        variant: 'default',
      });

      router.push('/posts');
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <fieldset className="mb-4">
        <label
          htmlFor="title"
          className="block text-slate-700 text-sm font-bold mb-2"
        >
          Title:
        </label>
        <input
          {...form.register('title')}
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
        />

        {form.formState.errors.title && (
          <p className="text-red-500 text-xs italic">
            {form.formState.errors.title.message}
          </p>
        )}
      </fieldset>

      <fieldset className="mb-4">
        <label
          htmlFor="content"
          className="block text-slate-700 text-sm font-bold mb-2"
        >
          Content:
        </label>
        <textarea
          {...form.register('content')}
          name="content"
          id="content"
          placeholder="Content"
          rows={20}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </fieldset>

      <div className="flex w-full justify-end">
        <Button type="submit" variant="default">
          Save
        </Button>
      </div>

      {!!serverError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4">
          <strong className="font-bold">Oops!</strong>
          <span className="block sm:inline"> Something went wrong.</span>
        </div>
      )}
    </form>
  );
};
