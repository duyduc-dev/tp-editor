export type StyledComponentProps<P> = {
  [$Key in keyof P as `$${string & $Key}`]: P[$Key];
};
