import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { hello } from './hello.js';

const root = dirname(fileURLToPath(import.meta.url));

test('hello returns hello', () => {
  assert.equal(hello(), 'hello');
});

test('cli prints hello plus a newline', () => {
  const result = spawnSync(process.execPath, [join(root, 'cli.js')], {
    encoding: 'utf8',
  });
  assert.equal(result.status, 0);
  assert.equal(result.stdout, 'hello\n');
});
