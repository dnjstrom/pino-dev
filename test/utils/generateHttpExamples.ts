#!/usr/bin/env ts-node

import http from "http";
import pinoHttp from "pino-http";
import request from "supertest";

export const generateExamples = async (): Promise<void> => {
  const httpLogger = pinoHttp();

  await new Promise<void>((resolve, reject) => {
    request(
      http.createServer((req, res) => {
        httpLogger(req, res);
        req.log.info("something else");
        res.end("hello world");
      })
    )
      .get("/greet/world")
      .end((err: Error | undefined) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
  });
};

generateExamples()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
