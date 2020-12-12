type Request = {
  method: string;
  url: string;
};

type Response = {
  statusCode: number;
};

export type Input = {
  msg: string;
  time?: Date;
  level?: number;
  ns?: string;
  name?: string;
  stack?: string;
  req?: Request;
  res?: Response;
  responseTime?: number;
};

export type Config = {
  newline: string;
  timeFormat: string;
  propertyMap: PropertyMap;
};

export type PropertyMap = {
  msg: string;
  level: string;
  ns: string;
  name: string;
  stack: string;
  time: string;
  "req.method": string;
  "req.url": string;
  "res.statusCode": string;
  responseTime: string;
};
