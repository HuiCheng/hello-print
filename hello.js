import { parseArgs } from 'node:util';

export function parseName(args) {
  const { values } = parseArgs({
    args,
    options: {
      name: { type: 'string' },
    },
    strict: true,
  });
  return values.name;
}

export function hello(name) {
  if (name === undefined) {
    return 'hello';
  }
  return `hello, ${name}`;
}
