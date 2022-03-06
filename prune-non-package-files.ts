#!/usr/bin/env ts-node

// eslint-disable-next-line node/shebang
import { execSync } from "child_process";
import { mkdir, rm, rename } from "fs/promises";
import crypto from "crypto";
import path from "path";

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

  await rm(BUILD_FOLDER_PATH, { recursive: true, force: true });

  await rename(
    path.join(TMP_FOLDER, "package", BUILD_FOLDER),
    BUILD_FOLDER_PATH
  );
};

const cleanupTmpDir = async () => {
  rm(TMP_FOLDER, { recursive: true, force: true });
};

main().catch(console.error).finally(cleanupTmpDir);
