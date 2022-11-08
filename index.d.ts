export declare interface Field {
  name: string;
  properties?: Schema;
  items?: Schema;
}

export declare interface Schema {
  [field: string]: string | Field;
}

export declare function remap(source: any, schema: Schema): any;
