# pino-dev

A simple prettifier for `pino` with built-in support for commonly used ecosystem packages (currently `pino-http` and `pino-debug`).

**DISCLAIMER**: This is currently alpha software under active development.

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

```
Usage: pino dev [options] 

Options:
  -h, --help     Output usage information
  -m, --map      Map arbitrary incoming properties to semantic pino-dev properties using json.
  -v, --version  Output the version number
```

#### -m, --map

Allows you to map arbitrary incoming properties to semantic pino-dev properties using json. For instance,

```echo '{"message": "foobar"}' | pino-dev --map '{"msg": "message"}'```

would map the `message` property in the incoming json to the semantic property `msg` which enables `pino-dev` to understand how to format the log. 

The current semantic properties are `msg`, `level`, `ns`, `name`, `stack`, `time`, `req.method`, `req.url`, `res.statusCode`, `responseTime`. It's possible to use dot-notation to map deep properties, and mapping to a boolean `false` will disable the default mapping (e.g. `pino-dev --map '{"name": false}'` won't display the name in the prettified output).

 