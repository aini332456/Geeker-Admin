export declare class Meta<C = number, I = string, S = string> {
  code: C;
  intro: I;
  state: S;
  match(code: any): boolean;
  constructor(code: C, intro: I, state?: S);
}
