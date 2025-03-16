export type Tail<T> = T extends [infer _, ...infer U] ? U : never;
