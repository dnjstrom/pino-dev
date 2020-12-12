# pino-dev

A simple prettifier for `pino` with built-in support for commonly used ecosystem packages (currently `pino-http` and `pino-debug`).

![Screenshot](https://github.com/dnjstrom/pino-dev/blob/main/screenshot.png?raw=true)

## Quickstart

Install with one of the commands below
```bash
npm install --save-dev pino-dev
yarn add --dev pino-dev
```

Then pipe the output of your `pino`-enhanced app to the `pino-dev` cli in your package.json.
```json
{
  "scripts": {
    "dev": "./start-your-app | pino-dev"  
  } 
}
```

In some situations using `npx` can also be really convenient:

```bash
yarn start | npx pino-dev
``` 

## Configuration

Any configuration can be stored as a `pino-dev.config.json` or `pino-dev.config.js` file at the root of your repo. It's also possible to use a `"pino-dev": {...}` key in your `package.json`.

### Default config
```json
{
  "newline": "\n",
  "timeFormat": "HH:mm:ss.SSS",
  "propertyMap": {
    "msg": "msg",
    "level": "level",
    "ns": "ns",
    "name": "name",
    "stack": "stack",
    "time": "time",
    "req.method": "req.method",
    "req.url": "req.url",
    "res.statusCode": "res.statusCode",
    "responseTime": "responseTime"
  }
}
```

It's also possible to override the configuration file with the command-line arguments below:

```
Usage: pino dev [options] 

      --color         Force color.
  -h, --help          Output usage information
  -n, --newline       The newline character used in prettified output. Either "\n" (default) or "\r\n".
      --no-color      Force no color.
  -m, --property-map  Map arbitrary incoming properties to semantic pino-dev properties using json.
  -t, --time-format   The time format to use (syntax according to https://www.npmjs.com/package/date-fns).
  -v, --version       Output the version number
```

#### propertyMap

This configuration allows you to map arbitrary incoming properties to semantic pino-dev properties using json. For instance,

```echo '{"message": "foobar"}' | pino-dev --property-map '{"msg": "message"}'```

would map the `message` property in the incoming json to the semantic property `msg` which enables `pino-dev` to understand how to format the log. For deep properties it's possible to use dot-notation, and mapping to a boolean `false` will disable the default mapping (e.g. `pino-dev --property-map '{"name": false}'` won't display the name in the prettified output).

 