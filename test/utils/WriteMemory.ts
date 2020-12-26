import { Writable } from "stream";

export class WriteMemory extends Writable {
  buffer: string;

  constructor() {
    super();
    this.buffer = "";
  }

  _write(
    // eslint-disable-next-line
    chunk: any,
    _encoding: BufferEncoding,
    next: (error?: Error | null) => void
  ): void {
    this.buffer += chunk.toString();
    next();
  }

  reset(): void {
    this.buffer = "";
  }
}
