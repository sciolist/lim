#!/usr/bin/env node
var input = [];
var esprima = require('esprima');
var escodegen = require('escodegen');

process.stdin.on('data', function (d) {
  input.push(d.toString('utf-8'));
});

process.stdin.on('end', function (d) {
  var code = input.join('');
  if(code[0] === '#' && code[1] === '!') {
    code = code.replace(/^.*\n/, '');
  }
  var parsed = esprima.parse(code);
  var genned = escodegen.generate(parsed);
  process.stdout.write(genned);
});

