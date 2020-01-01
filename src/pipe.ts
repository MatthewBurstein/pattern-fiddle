import { State } from "./types";

export function pipe(initialValue: State, functionArray: ((...args: any[]) => State)[]): State {
    return functionArray.reduce(
      (previousReturnValue, fn) => fn(previousReturnValue),
      initialValue
    )
  }