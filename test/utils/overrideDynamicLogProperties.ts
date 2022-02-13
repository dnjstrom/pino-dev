import { Input } from "../../src/types";

const TIME = new Date("1969-07-21 02:56:15").getTime();

// Overrides some dynamic properties with static ones to ensure stable snapshot tests.
export const overrideDynamicLogProperties = <T extends Input>(log: T): T => {
  if (log.pid !== undefined) {
    log.pid = 12345;
  }

  if (log.hostname !== undefined) {
    log.hostname = "localhost";
  }

  if (log.time !== undefined) {
    log.time = TIME;
  }

  if (log.err?.stack !== undefined) {
    log.err = {
      ...log.err,
      stack: log.err.stack.replace(/\/.+:\d\d/gi, "/some/path/to/file:23:98"),
    };
  }

  if (log.responseTime !== undefined) {
    log.responseTime = 123;
  }

  return log;
};
