export type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
export type JsonArray = JsonValue[];

export interface JsonObject {
  [key: string]: JsonValue;
}

export interface ParsedFile {
  name: string;
  size: number;
  data: JsonObject[]; // We enforce an array of objects for this app
}

export enum ViewMode {
  GRID = 'GRID',
  LIST = 'LIST'
}
