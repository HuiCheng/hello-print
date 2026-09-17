import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export function hello() {
  return 'hello';
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  console.log(hello());
}
