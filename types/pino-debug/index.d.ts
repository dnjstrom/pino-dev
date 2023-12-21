declare module "pino-debug" {
  function init(
    input: import("pino").Logger,
    options: { map: Record<string, string> },
  ): void;

  export default init;
}
