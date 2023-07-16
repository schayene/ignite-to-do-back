interface DataPathType {
  [key: string]: unknown;
}

export declare class Database {
  patch(table: string, id: string, data: DataPathType): void;
}
