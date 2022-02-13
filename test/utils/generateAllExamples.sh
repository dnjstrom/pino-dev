#!/usr/bin/env bash

echo "miscellaneous text" > ./test/utils/examples.ndjson
./test/utils/generatePinoExamples.ts >> ./test/utils/examples.ndjson
./test/utils/generateHttpExamples.ts >> ./test/utils/examples.ndjson
./test/utils/generateDebugExamples.ts >> ./test/utils/examples.ndjson