#!/usr/bin/env ts-node

// eslint-disable-next-line node/shebang
import { execSync } from "child_process";
import fs from "fs";
import crypto from "crypto";
import path from "path";
import { promisify } from "util";
import rimraf from "rimraf";

const mkdir = promisify(fs.mkdir);
const rm = promisify(rimraf);
const rename = promisify(fs.rename);

const BUILD_FOLDER = "dist";
const BUILD_FOLDER_PATH = path.resolve(__dirname, BUILD_FOLDER);
const TMP_FOLDER = path.resolve(
  __dirname,
  `.prune-non-package-files-${crypto.randomBytes(10).toString("hex")}`
);

const main = async () => {
  await mkdir(TMP_FOLDER);

  const output = execSync(
    `npm pack --pack-destination ${TMP_FOLDER} 2>&1`
  ).toString();

  const packageFileName = output.match(/filename:\s+(.+)/i)?.[1];

  if (!packageFileName) {
    throw new Error("Unable to get package archive filename.");
  }

  execSync(
    `tar -xf ${path.join(TMP_FOLDER, packageFileName)} -C ${TMP_FOLDER}`
  );

  await rm(BUILD_FOLDER_PATH);

  await rename(
    path.join(TMP_FOLDER, "package", BUILD_FOLDER),
    BUILD_FOLDER_PATH
  );
};

const cleanupTmpDir = async () => {
  rm(TMP_FOLDER);
};

main()
  .catch((err) => {
    process.exitCode = 1;

    console.error(err);

    if ("stdout" in err) {
      const buffer: Buffer = err.stdout;
      console.log("## STDOUT ##########");
      console.log(buffer.toString());
    }

    if ("stderr" in err) {
      const buffer: Buffer = err.stderr;
      console.error("## STDERR ##########");
      console.error(buffer.toString());
    }
  })
  .finally(cleanupTmpDir);
