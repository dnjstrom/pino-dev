import { Writable } from "stream";

const TIME = new Date("1969-07-21 02:56:15").getTime();

export class ListDestination extends Writable {
  private output: unknown[];

  constructor() {
    super();
    this.output = [];
  }

  _write(
    chunk: Buffer,
    _encoding: BufferEncoding,
    done: (error?: Error | null) => void
  ): void {
    let log: {
      pid?: number;
      time?: number;
      hostname?: string;
      stack?: string;
      responseTime?: number;
    };

    try {
      log = JSON.parse(chunk.toString());
    } catch (e) {
      this.output.push(chunk.toString());
      return done();
    }

    // Make pid static to avoid breaking snapshots.
    if (log.pid !== undefined) {
      log.pid = 12345;
    }

    // Make time static to avoid breaking snapshots.
    if (log.time !== undefined) {
      log.time = TIME;
    }

    // Make hostname static to avoid breaking snapshots.
    if (log.hostname !== undefined) {
      log.hostname = "my-computer";
    }

    if (log.stack !== undefined) {
      log.stack = log.stack.replace(/\/.+:\d\d/gi, "/some/path/to/file:23:98");
    }

    if (log.responseTime !== undefined) {
      log.responseTime = 123;
    }

    this.output.push(log);
    done();
  }

  getOutput(): unknown[] {
    return this.output;
  }
}
