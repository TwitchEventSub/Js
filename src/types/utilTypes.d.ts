export type RequireOne<T, Key extends keyof T> = T & { [P in Key]-?: T[P] };

// for generics we can't use unknown
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PickOne<O extends Record<any, any>> = {
  [K in keyof O]: RequireOne<
    {
      [P in keyof O]?: P extends K ? O[P] : undefined;
    },
    K
  >
}[keyof O];

// for generics we can't use unknown
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AddPrefix<T extends Record<string, any>, Prefix extends string> = {
  [K in keyof T as `${Prefix}${K}`]: T[K];
};
