import { Writable } from "stream";
import { LogLike } from "./LogLike";
import { overrideDynamicLogProperties } from "./overrideDynamicLogProperties";

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
    let log: LogLike;

    try {
      log = overrideDynamicLogProperties(JSON.parse(chunk.toString()));
    } catch (e) {
      this.output.push(chunk.toString());
      return done();
    }

    this.output.push(log);

    done();
  }

  getOutput(): unknown[] {
    return this.output;
  }
}
