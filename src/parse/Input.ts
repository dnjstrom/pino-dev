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
