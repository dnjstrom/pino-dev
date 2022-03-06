import { IncomingMessage, ServerResponse } from "http";

type Request = Pick<IncomingMessage, "method" | "url" | "headers"> & {
  remotePort?: number;
};

type Response = Pick<ServerResponse, "statusCode">;

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
