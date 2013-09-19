#!/bin/sh
IFS=$'\n'
FILES=$(find lib -name "*.js")
for F in $FILES
do
  mkdir -p ${F%/*} 
  traceur --sourcemap --out "build/$F" "$F"
done

