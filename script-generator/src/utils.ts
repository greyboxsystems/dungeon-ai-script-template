export type ForbidKeys<T, Forbidden extends string> = {
  [K in keyof T]: K extends Forbidden ? never : T[K];
};
