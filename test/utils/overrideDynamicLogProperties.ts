import { Input } from "../../src/types";

const TIME = new Date("1969-07-21 02:56:15").getTime();

const STACK = `Error: Oh noes!
at /some/path/to/file:23:98
at step (/some/path/to/file:23:98)
at Object.next (/some/path/to/file:23:98)
at /some/path/to/file:23:98
at new Promise (<anonymous>)
at __awaiter (/some/path/to/file:23:98)
at generateExamples (/some/path/to/file:23:98)
at Object.<anonymous> (/some/path/to/file:23:98)
at Module._compile (internal/some/path/to/file:23:98)
at Module.m._compile (/some/path/to/file:23:98)`;

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
    log.err.stack = STACK;
  }

  if (log.responseTime !== undefined) {
    log.responseTime = 123;
  }

  return log;
};
