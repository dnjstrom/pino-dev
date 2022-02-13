export interface LogLike {
  pid?: number;
  time?: number;
  hostname?: string;
  stack?: string;
  responseTime?: number;
  ns?: string;
}
