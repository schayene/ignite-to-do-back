interface ValidatorType {
  fields: Array<string>;
  data: any;
}

interface ReturnType {
  error: boolean;
  message: string;
}

export declare function validator({ fields, data }: ValidatorType): {
  error: boolean;
  message: string;
};
