const time = new Date("1969-07-21 02:56:15").getTime();

export const examples = [
  123,
  "Some string",
  [1, 2, 3],
  {
    level: 4456789,
  },
  {
    msg: "A message without anything else",
  },
  {
    msg: "A message without level.",
    time,
  },
  {
    msg: "A message without time",
    level: 10,
  },
  {
    level: 60,
    name: "acme",
    msg: "This is a message",
    time,
  },
  {
    level: 50,
    name: "acme",
    msg: "This is a message",
    time,
  },
  {
    level: 40,
    name: "acme",
    msg: "This is a message",
    time,
  },
  {
    level: 30,
    name: "acme",
    msg: "This is a message",
    time,
  },
  {
    level: 20,
    name: "acme",
    msg: "This is a message",
    time,
  },
  {
    level: 10,
    name: "acme",
    msg: "This is a message",
    time,
  },
  {
    level: 30,
    time: 1607289378936,
    pid: 13449,
    name: "acme",
    hostname: "daniel.strom.Mac.local",
    req: {
      id: 1,
      method: "GET",
      url: "/",
      headers: {
        host: "localhost:3000",
        "user-agent": "curl/7.64.1",
        accept: "*/*",
      },
      remoteAddress: "::1",
      remotePort: 56596,
    },
    res: {
      statusCode: 200,
      headers: {
        "x-powered-by": "Express",
        "content-type": "text/html; charset=utf-8",
        "content-length": "11",
        etag: 'W/"b-Kq5sNclPz7QV2+lfQIuc6R7oRu0"',
      },
    },
    responseTime: 3,
    msg: "request completed",
  },
  {
    level: 50,
    time: 1607289378936,
    pid: 13449,
    name: "acme",
    hostname: "daniel.strom.Mac.local",
    req: {
      id: 1,
      method: "HEAD",
      url: "/ping",
      headers: {
        host: "localhost:3000",
        "user-agent": "curl/7.64.1",
        accept: "*/*",
      },
      remoteAddress: "::1",
      remotePort: 56596,
    },
    res: {
      statusCode: 500,
      headers: {
        "x-powered-by": "Express",
        "content-type": "text/html; charset=utf-8",
        "content-length": "11",
        etag: 'W/"b-Kq5sNclPz7QV2+lfQIuc6R7oRu0"',
      },
    },
    responseTime: 3,
    msg: "request errored",
  },
  {
    level: 30,
    time: 1607289378936,
    pid: 13449,
    name: "acme",
    hostname: "daniel.strom.Mac.local",
    req: {
      id: 1,
      method: "POST",
      url: "/post/123",
      headers: {
        host: "localhost:3000",
        "user-agent": "curl/7.64.1",
        accept: "*/*",
      },
      remoteAddress: "::1",
      remotePort: 56596,
    },
    res: {
      statusCode: 301,
      headers: {
        "x-powered-by": "Express",
        "content-type": "text/html; charset=utf-8",
        "content-length": "11",
        etag: 'W/"b-Kq5sNclPz7QV2+lfQIuc6R7oRu0"',
      },
    },
    responseTime: 3,
    msg: "request errored",
  },
  {
    level: 10,
    name: "acme",
    msg: "A message with a namespace",
    time,
    ns: "express:router",
  },
  {
    level: 20,
    msg: "This is a message without name",
    time,
  },
  {
    level: 20,
    name: "acme",
    msg: `This is a message with newlines ${JSON.stringify(
      {
        foo: "bar",
      },
      null,
      2
    )}`,
    time,
  },
  {
    level: 50,
    pid: 62822,
    hostname: "my-computer.Mac.local",
    name: "acme",
    msg: "Uncaught exception",
    time,
    stack:
      "Error: This is an error\n    at Producer.flush (/app/node_modules/some-file.js:245:11)\n    at Producer.disconnect (/app/node_modules/some-file.js:288:8)\n    at process.<anonymous> (/app/src/foobar.ts:81:12)\n    at process.emit (events.js:323:22)\n    at process.emit (/app/node_modules/source-map-support/source-map-support.js:495:21)",
  },
  {
    level: 20,
    name: "acme",
    msg: "\t   This is a message with leading whitespace",
    time,
  },
  {
    level: 20,
    name: "acme",
    msg: "This is a message with ending whitespace\t   ",
    time,
  },
];
