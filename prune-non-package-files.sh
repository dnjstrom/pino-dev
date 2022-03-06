#!/bin/bash

# Exit if any command fails
set -e

# Pack the archive
archive=$(npm pack)

# Replace build folder with package contents
tar -xf "$archive"
rm -fr dist
mv package/dist dist

# Clean up
rm -fr package
rm -fr "$archive"
