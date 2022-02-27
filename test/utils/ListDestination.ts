import { Writable } from "stream";
import { Input } from "../../src/types";
import { overrideDynamicLogProperties } from "./overrideDynamicLogProperties";

export class ListDestination extends Writable {
  private output: unknown[];

  constructor() {
    super();
    this.output = [];
  }

  override _write(
    chunk: Buffer,
    _encoding: BufferEncoding,
    done: (error?: Error | null) => void
  ): void {
    let log: Input;

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
