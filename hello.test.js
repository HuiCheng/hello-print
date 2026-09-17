import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { hello } from './hello.js';

test('hello returns hello', () => {
  assert.equal(hello(), 'hello');
});

test('cli prints hello', () => {
  const result = spawnSync(process.execPath, [fileURLToPath(new URL('./cli.js', import.meta.url))], {
    encoding: 'utf8',
  });
  assert.equal(result.status, 0);
  assert.equal(result.stdout, 'hello\n');
});

test('hello with Ada returns hello, Ada', () => {
  assert.equal(hello('Ada'), 'hello, Ada');
});

test('cli --name Ada prints hello, Ada', () => {
  const cli = fileURLToPath(new URL('./cli.js', import.meta.url));
  const result = spawnSync(process.execPath, [cli, '--name', 'Ada'], {
    encoding: 'utf8',
  });
  assert.equal(result.status, 0);
  assert.equal(result.stdout, 'hello, Ada\n');
});

test('cli --loud prints HELLO', () => {
  const cli = fileURLToPath(new URL('./cli.js', import.meta.url));
  const result = spawnSync(process.execPath, [cli, '--loud'], {
    encoding: 'utf8',
  });
  assert.equal(result.status, 0);
  assert.equal(result.stdout, 'HELLO\n');
});

test('cli --name Ada --loud prints HELLO, ADA', () => {
  const cli = fileURLToPath(new URL('./cli.js', import.meta.url));
  const result = spawnSync(process.execPath, [cli, '--name', 'Ada', '--loud'], {
    encoding: 'utf8',
  });
  assert.equal(result.status, 0);
  assert.equal(result.stdout, 'HELLO, ADA\n');
});
