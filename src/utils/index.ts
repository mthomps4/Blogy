import { ServerError } from '@/types/server';

export const magicStringHelper = (str: string) => {
  return str + ' magic string helper';
};

export const buildErrorResponse = (error: unknown): ServerError => {
  if (error instanceof Error) {
    // TODO: Normalize Error Return
    return error;
  }

  return {
    message: 'Unknown Server Error',
    code: 500,
  };
};
