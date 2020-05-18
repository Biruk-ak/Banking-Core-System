export type Result<T, E = Error> = Ok<T> | Err<E>;
export class Ok<T> {
  readonly ok = true as const;
  constructor(public readonly value: T) {}
  map<U>(fn: (v: T) => U): Result<U, never> { return new Ok(fn(this.value)); }
  flatMap<U, F>(fn: (v: T) => Result<U, F>): Result<U, F> { return fn(this.value); }
}
export class Err<E> {
  readonly ok = false as const;
  constructor(public readonly error: E) {}
  map<U>(_fn: (v: never) => U): Result<U, E> { return this as unknown as Result<U, E>; }
  flatMap<U, F>(_fn: (v: never) => Result<U, F>): Result<U, E | F> { return this as unknown as Result<U, E | F>; }
}
export const ok = <T>(value: T) => new Ok(value);
export const err = <E>(error: E) => new Err(error);
