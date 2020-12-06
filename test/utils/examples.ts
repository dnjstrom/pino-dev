const time = new Date("1969-07-21 02:56:15").getTime();

export const examples = [
  {
    msg: "A message without level.",
    time,
  },
  {
    level: 4456789,
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
    level: 10,
    name: "acme",
    msg: "query  : /some-route",
    time,
    ns: "express:router",
  },
  {
    level: 20,
    msg: "This is a message without name",
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
    msg: `This is a message with newlines ${JSON.stringify(
      {
        foo: "bar",
      },
      null,
      2
    )}`,
    time,
  },
];
