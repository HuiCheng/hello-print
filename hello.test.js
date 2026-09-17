import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { hello } from './hello.js';

test('hello returns hello', () => {
  assert.equal(hello(), 'hello');
});

test('cli prints hello', () => {
  const result = spawnSync(process.execPath, [fileURLToPath(new URL('./hello.js', import.meta.url))], {
    encoding: 'utf8',
  });
  assert.equal(result.status, 0);
  assert.equal(result.stdout, 'hello\n');
});
