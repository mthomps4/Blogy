// TODO: This all needs love -- hacked in as a starter
// TODO: add a normalized Error Object > Error
export type ServerError =
  | {
      message: string;
      code: number;
      path?: string;
    }
  | Error;

export type AppServerError = ServerError | unknown;

export type AppServerResponse<T> =
  | {
      data: T;
      error: undefined;
    }
  | { data: undefined; error: AppServerError };
