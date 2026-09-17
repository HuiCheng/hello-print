import { parseArgs } from 'node:util';

export function parseOptions(args) {
  const { values } = parseArgs({
    args,
    options: {
      name: { type: 'string' },
      loud: { type: 'boolean', default: false },
    },
    strict: true,
  });
  return { name: values.name, loud: values.loud };
}

export function hello(name) {
  if (name === undefined) {
    return 'hello';
  }
  return `hello, ${name}`;
}

export function render(text, loud) {
  if (loud) {
    return text.toUpperCase();
  }
  return text;
}
