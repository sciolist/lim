#!/bin/sh
IFS=$'\n'
FILES=$(find lib -name "*.js")
for F in $FILES
do
  mkdir -p "build/${F%/*}"
  node utils/build-file.js < "$F" > "build/$F"
done

