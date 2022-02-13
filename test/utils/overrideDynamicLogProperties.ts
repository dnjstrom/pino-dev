import { LogLike } from "./LogLike";

const TIME = new Date("1969-07-21 02:56:15").getTime();

// Overrides some dynamic properties with static ones to ensure stable snapshot tests.
export const overrideDynamicLogProperties = <T extends LogLike>(log: T): T => {
  if (log.pid !== undefined) {
    log.pid = 12345;
  }

  if (log.time !== undefined) {
    log.time = TIME;
  }

  if (log.hostname !== undefined) {
    log.hostname = "my-computer";
  }

  if (log.stack !== undefined) {
    log.stack = log.stack.replace(/\/.+:\d\d/gi, "/some/path/to/file:23:98");
  }

  if (log.responseTime !== undefined) {
    log.responseTime = 123;
  }

  return log;
};
