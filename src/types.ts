type Request = {
  method: string;
  url: string;
};

type Response = {
  statusCode: number;
};

type Error = {
  type: string;
  message: string;
  stack: string;
};

export type Input = {
  msg: string;
  pid?: number;
  hostname?: string;
  time?: number | string;
  level?: number;
  ns?: string;
  name?: string;
  err?: Error;
  req?: Request;
  res?: Response;
  responseTime?: number;
};

export type Config = {
  newline: string;
  timeFormat: string;
  propertyMap: PropertyMap;
};

type PropertyMapValue = string | boolean;

/**
 * The mapping between semantic properties on the left, and arbitrary data paths on the right.
 * By getting the value of the key on the right and setting the key on the left a valid Input
 * should be constructed.
 */
export type PropertyMap = {
  msg: PropertyMapValue;
  level: PropertyMapValue;
  ns: PropertyMapValue;
  name: PropertyMapValue;
  "err.stack": PropertyMapValue;
  time: PropertyMapValue;
  "req.method": PropertyMapValue;
  "req.url": PropertyMapValue;
  "res.statusCode": PropertyMapValue;
  responseTime: PropertyMapValue;
};

export type Falsy = false | 0 | null | undefined | "";
