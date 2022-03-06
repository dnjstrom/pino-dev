# pino-dev

A simple prettifier for [pino](https://github.com/pinojs/pino) with built-in support for common ecosystem packages. Designed to be clear, unintrusive and to the point with sensible defaults optimized for development use.

![Node.js CI](https://github.com/dnjstrom/pino-dev/actions/workflows/node.js.yml/badge.svg)
![Codeql Analysis](https://github.com/dnjstrom/pino-dev/actions/workflows/codeql-analysis.yml/badge.svg)

![Screenshot](https://github.com/dnjstrom/pino-dev/blob/main/screenshot.png?raw=true)

## Supported packages

- [pino](https://github.com/pinojs/pino)
- [pino-debug](https://github.com/pinojs/pino-debug)
- [pino-http](https://github.com/pinojs/pino-http)

Is your favorite pino package not yet supported? Request support [here](https://github.com/dnjstrom/pino-dev/issues/new).

## Issues

Discovered a problem with pino-dev? [Report an issue](https://github.com/dnjstrom/pino-dev/issues/new).

## Quickstart

Install using one of the commands below

```bash
npm install --save-dev pino-dev
yarn add --dev pino-dev
```

then pipe the output of your `pino`-enhanced app to the `pino-dev` cli in your `package.json` scripts.

```json
{
  "scripts": {
    "dev": "./start-your-app | pino-dev"
  }
}
```

In some situations using `npx` can also be convenient to pipe arbitrary commands through `pino-dev`:

```bash
cat server.log | npx pino-dev
```

## Configuration

Configuration can be stored as a `pino-dev.config.json` or `pino-dev.config.js` file at the root of your repo. It's also possible to use a `"pino-dev": {...}` key in your `package.json`.

### Default config

```json
{
  "newline": "\n",
  "timeFormat": "HH:mm:ss",
  "colorize": undefined,
  "propertyMap": {
    "msg": "msg",
    "level": "level",
    "ns": "ns",
    "name": "name",
    "err.stack": "err.stack",
    "time": "time",
    "req.method": "req.method",
    "req.url": "req.url",
    "res.statusCode": "res.statusCode",
    "responseTime": "responseTime"
  }
}
```

#### newline (string)

The newline character used in prettified output. Usually dependent on your operating system, it's either "\n" (default) or "\r\n".

#### time-format (string)

The time format to use (syntax according to https://www.npmjs.com/package/date-fns).

#### colorize (boolean)

Forces colors on or off. If left undefined color support is detected automatically.

#### propertyMap (Record<string, string>)

This configuration allows you to map arbitrary incoming properties to semantic pino-dev properties using json. For instance,

`echo '{"message": "foobar"}' | pino-dev --property-map '{"msg": "message"}'`

would map the `message` property in the incoming json to the semantic property `msg` which enables `pino-dev` to understand how to format the log. For deep properties it's possible to use dot-notation, and mapping to a boolean `false` will disable the default mapping (e.g. `pino-dev --property-map '{"name": false}'` won't display the name in the prettified output).

### Command line arguments

It's also possible to specify/override configuration with command-line arguments:

```
Usage: pino-dev [options]

    --, --color         Force color.
    -h, --help          Output usage information
    -n, --newline       The newline character used in prettified output. Either "\n" (default) or "\r\n".
    --, --no-color      Force no color.
    -m, --property-map  Map arbitrary incoming properties to semantic pino-dev properties using json.
    -t, --time-format   The time format to use (syntax according to https://www.npmjs.com/package/date-fns).
    -v, --version       Output the version number
```
