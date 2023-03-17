#!/usr/bin/env ts-node

// eslint-disable-next-line node/shebang
import { lstat, unlink } from "fs/promises";
import { glob } from "glob";
import packageJson from "./package.json";
import { minimatch } from "minimatch";

const BUILD_FOLDER = "dist";

const main = async () => {
  const buildFiles = await glob(`${BUILD_FOLDER}/**/*`);

  const fileMatchResults = packageJson.files.reduce<string[]>(
    (files, pattern) => {
      if (pattern[0] === "!") {
        return files.filter(minimatch.filter(pattern));
      } else {
        return files.concat(buildFiles.filter(minimatch.filter(pattern)));
      }
    },
    []
  );

  const validFiles = new Set(fileMatchResults);

  await Promise.all(
    buildFiles.map(async (file) => {
      if (validFiles.has(file)) {
        return;
      }

      const fileStats = await lstat(file);
      if (fileStats.isDirectory()) {
        return;
      }

      await unlink(file);
    })
  );
};

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
